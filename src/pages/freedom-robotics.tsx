import React from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import FreedomRoboticsZone from 'zones/freedomRobotics';
import {FRDeviceFetcher, FRDeviceDataFetcher} from 'lib/freedom-robotics-service';

interface Props {
  /** Device data from the freedomRobotics API */
  freedomRoboticsData: any;
}

// Demo page for freedom-robotics API driven visualizations
const FreedomRoboticsPage: ZonePage = (props: Props) => {
  const {freedomRoboticsData} = props;
  const {name, platform, device} = freedomRoboticsData;

  const getDeviceData = async () => {
    const testData = await FRDeviceDataFetcher();
    console.log('testData:', testData);
  };

  setTimeout(() => {
    return getDeviceData();
  }, 1000);

  return (
    <>
      <Typography type="Display" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Freedom Robotics Demo
      </Typography>
      <Typography type="Title" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Device ID: {device}
      </Typography>
      <Typography type="Subtitle" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Device Name: {name}
      </Typography>
      <Typography type="Subtitle" color={colors.blueGrey.darken3} marginBottom={'1rem'}>
        Platform: {platform}
      </Typography>
    </>
  );
};

FreedomRoboticsPage.zone = FreedomRoboticsZone;

export async function getStaticProps () {
  const data = await FRDeviceFetcher();

  return {
    props: {
      freedomRoboticsData: data
    }
  };
}

// Default export is a requirement for nextjs to know this is the export for the page.
export default FreedomRoboticsPage;
