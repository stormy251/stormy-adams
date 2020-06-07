import React, {useEffect, useState} from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import FreedomRoboticsZone from 'zones/freedomRobotics';
import {
  FRDeviceFetcher,
  FRDeviceDataWindowFetcher,
  FRDeviceDataFetcher
} from 'lib/freedom-robotics-service';
import styled from 'styled-components';
import VehicleSonarViz from 'zones/freedomRobotics/components/VehicleSonarViz';
import VehicleGPSViz from 'zones/freedomRobotics/components/VehicleGPSViz';

const VizGridLayoutContainer = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1.5rem;
  padding: 1rem;
  width: 100%;

  @media only screen and (max-width: 600px) {
    grid-template-rows: 1fr 1fr;
  }
`;

const InfoContainer = styled.div`
  box-sizing: border-box;
  padding-left: 1rem;
`;

const VizControlBarContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  height: 3.5rem;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  * {
    margin-right: 0.5rem;
  }
`;

// Demo page for freedom-robotics API driven visualizations
const FreedomRoboticsPage: ZonePage = () => {
  const [currentDeviceInfo, setCurrentDeviceInfo] = useState({
    device: '',
    name: ''
  });
  const [currentGPSData, setCurrentGPSData] = useState([]);
  const [currentSonarCloudData, setCurrentSonarCloudData] = useState([]);
  // used to drive the state to either poll the device in real time, or to look at the specified timeslot
  const [isRealTime, setIsRealTime] = useState(true);
  const pollRateMS = 10000;

  /**
   * Extract the Vehicle GPS topic data from the device data, and load it into state
   * @param deviceData
   */
  const setVehicleGPSData = (deviceData) => {
    const vehicleGPSData = deviceData.filter((topicData) => {
      return topicData.topic === '/vehicle/gps/fix';
    });
    setCurrentGPSData(
      vehicleGPSData.map((topicData) => {
        const topicDateUTC = topicData.utc_time * 1000; // convert seconds to milliseconds
        const {altitude, latitude, longitude} = topicData.data;
        return {
          altitude,
          latitude,
          longitude,
          timeStamp: new Date(topicDateUTC).toString()
        };
      })
    );
  };

  /**
   * Extract the Vehicle Sonar Cloud topic data from the device data, and load it into state
   * @param deviceData
   */
  const setVehicleSonarCloudData = (deviceData) => {
    const sonarCloudData = deviceData.filter((topicData) => {
      return topicData.topic === '/vehicle/sonar_cloud';
    });
    setCurrentSonarCloudData(
      sonarCloudData.map((topicData) => {
        const topicDateUTC = topicData.utc_time * 1000; // convert seconds to milliseconds
        const {height, width, is_bigendian, is_dense, point_step, row_step, data} = topicData.data;
        return {
          height,
          width,
          is_bigendian,
          is_dense,
          point_step,
          row_step,
          data,
          timeStamp: new Date(topicDateUTC).toString()
        };
      })
    );
  };

  /**
   * Responsible for issuing the correct data processing functions to populate the desired visualizations
   * @param deviceData
   */
  const updateVizData = (deviceData) => {
    // These methods will post process the device data into formats well suited for the respective visualization components
    setVehicleGPSData(deviceData);
    setVehicleSonarCloudData(deviceData);
  };

  /**
   * Responsible for using the correct fetcher to poll the most recent data from the device
   * @param deviceData
   */
  const pollData = async () => {
    const deviceData = await FRDeviceDataFetcher();
    updateVizData(deviceData);
    console.log('Device has been polled');
  };

  /**
   * Responsible for using the correct fetcher to poll a set historical dataset
   * @param deviceData
   */
  const pollHistoricData = async () => {
    const deviceData = await FRDeviceDataWindowFetcher();
    updateVizData(deviceData);
  };

  /**
   * Responsible for using the correct fetcher to poll high level details about the device itself
   * @param deviceData
   */
  const getDeviceInfo = async () => {
    const data = await FRDeviceFetcher();
    setCurrentDeviceInfo(data);
  };

  // This is responsible for switching the data polling structure based on if we are in real time mode or not.
  useEffect(() => {
    if (isRealTime) {
      pollData(); // this first time is just to ensure we don't wait a full 10 seconds prior to loading for the first time
      const interval = setInterval(() => {
        pollData();
      }, pollRateMS);
      return () => clearInterval(interval);
    } else {
      pollHistoricData();
    }
  }, [isRealTime]);

  // This will get the basic information about the device
  useEffect(() => {
    getDeviceInfo();
  }, []);

  return (
    <>
      <InfoContainer>
        <Typography type="Display" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
          Freedom Robotics Demo
        </Typography>
        <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'0.5rem'}>
          Device ID: {currentDeviceInfo.device}
        </Typography>
        <Typography type="Title" color={colors.blueGrey.darken3}>
          Device Name: {currentDeviceInfo.name}
        </Typography>
      </InfoContainer>
      <VizControlBarContainer>
        <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'0.5rem'}>
          Current Operating Mode:{' '}
          {isRealTime
            ? 'Real Time'
            : `Historic Snapshot ${new Date(1591437600)} - ${new Date(1591437660)}`}
        </Typography>
        <ButtonContainer>
          <button onClick={() => setIsRealTime(true)}>Real time</button>
          <button onClick={() => setIsRealTime(false)}>Historic Snapshot</button>
        </ButtonContainer>
      </VizControlBarContainer>
      <VizGridLayoutContainer>
        <VehicleGPSViz
          mostRecentDataPoint={currentGPSData[currentGPSData.length - 1] || {}}
          numOfDataPoints={currentGPSData.length}
          realTime={isRealTime}
        />
        <VehicleSonarViz
          mostRecentDataPoint={currentSonarCloudData[currentSonarCloudData.length - 1] || {}}
          numOfDataPoints={currentSonarCloudData.length}
          realTime={isRealTime}
        />
      </VizGridLayoutContainer>
    </>
  );
};

FreedomRoboticsPage.zone = FreedomRoboticsZone;

// Default export is a requirement for nextjs to know this is the export for the page.
export default FreedomRoboticsPage;
