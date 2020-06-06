import React, {useEffect, useState} from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import FreedomRoboticsZone from 'zones/freedomRobotics';
import {FRDeviceFetcher, FRDeviceDataFetcher} from 'lib/freedom-robotics-service';
import styled from 'styled-components';

const VizContainer = styled.div`
  padding: 1rem;
`;

interface Props {
  /** Device data from the freedomRobotics API */
  freedomRoboticsData: any;
}

// Demo page for freedom-robotics API driven visualizations
const FreedomRoboticsPage: ZonePage = (props: Props) => {
  const {freedomRoboticsData} = props;
  const {name, device, type} = freedomRoboticsData;
  const [currentGPSData, setCurrentGPSData] = useState([]);
  const [currentSonarCloudData, setCurrentSonarCloudData] = useState([]);

  const getDeviceData = async () => {
    let deviceData = await FRDeviceDataFetcher();
    let vehicleGPSData = deviceData.filter((topicData) => {
      return topicData.topic === '/vehicle/gps/fix';
    });
    setCurrentGPSData(
      vehicleGPSData.map((topicData) => {
        const {altitude, latitude, longitude} = topicData.data;
        return [altitude, latitude, longitude];
      })
    );
    let sonarCloudData = deviceData.filter((topicData) => {
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
    getDeviceData();
  }, []);

  return (
    <>
      <Typography type="Display" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Freedom Robotics Demo
      </Typography>
      <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Device ID: {device}
      </Typography>
      <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Device Name: {name}
      </Typography>
      <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Device Type: {type}
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

export async function getStaticProps() {
  const data = await FRDeviceFetcher();

  return {
    props: {
      freedomRoboticsData: data
    }
  };
}

// Default export is a requirement for nextjs to know this is the export for the page.
export default FreedomRoboticsPage;
