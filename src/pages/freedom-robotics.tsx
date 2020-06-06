import React, {useEffect, useState} from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import FreedomRoboticsZone from 'zones/freedomRobotics';
import {FRDeviceFetcher, FRDeviceDataWindowFetcher} from 'lib/freedom-robotics-service';
import styled from 'styled-components';

const VizContainer = styled.div`
  padding: 1rem;
`;

// Demo page for freedom-robotics API driven visualizations
const FreedomRoboticsPage: ZonePage = () => {
  const [currentDeviceInfo, setCurrentDeviceInfo] = useState({
    name: '',
    device: '',
    type: ''
  });
  const [currentGPSData, setCurrentGPSData] = useState([]);
  const [currentSonarCloudData, setCurrentSonarCloudData] = useState([]);

  const getDeviceInfo = async () => {
    const data = await FRDeviceFetcher();
    setCurrentDeviceInfo(data);
  };

  const getDeviceData = async () => {
    const deviceData = await FRDeviceDataWindowFetcher();
    console.log('deviceData:', deviceData);
    const vehicleGPSData = deviceData.filter((topicData) => {
      return topicData.topic === '/vehicle/gps/fix';
    });
    setCurrentGPSData(
      vehicleGPSData.map((topicData) => {
        const {altitude, latitude, longitude} = topicData.data;
        return [altitude, latitude, longitude];
      })
    );
    const sonarCloudData = deviceData.filter((topicData) => {
      return topicData.topic === '/vehicle/sonar_cloud';
    });
    setCurrentSonarCloudData(
      sonarCloudData.map((topicData) => {
        const {height, width, is_bigendian, is_dense, point_step, row_step, data} = topicData.data;
        return [
          height,
          width,
          is_bigendian.toString(),
          is_dense.toString(),
          point_step,
          row_step,
          data
        ];
      })
    );
  };

  useEffect(() => {
    getDeviceInfo();
    getDeviceData();
  }, []);

  return (
    <>
      <Typography type="Display" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Freedom Robotics Demo
      </Typography>
      <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Device ID: {currentDeviceInfo.device}
      </Typography>
      <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Device Name: {currentDeviceInfo.name}
      </Typography>
      <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Device Type: {currentDeviceInfo.type}
      </Typography>
      <VizContainer>
        <div>
          <Typography type="Subtitle" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
            Vehicle GPS Data
          </Typography>
          <div>{currentGPSData.toString()}</div>
        </div>
        <div>
          <Typography type="Subtitle" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
            Vehicle Sonar Data
          </Typography>
          <div>{currentSonarCloudData.toString()}</div>
        </div>
      </VizContainer>
    </>
  );
};

FreedomRoboticsPage.zone = FreedomRoboticsZone;

// Default export is a requirement for nextjs to know this is the export for the page.
export default FreedomRoboticsPage;
