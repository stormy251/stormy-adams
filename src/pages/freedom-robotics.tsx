import React, {ReactNode} from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import FreedomRoboticsZone from 'zones/freedomRobotics';
import {freedomRoboticsAPIService, freedomRoboticsVehicleAPIService} from 'lib/freedom-robotics/freedom-robotics-init';

interface Props {
  /** Device data from the freedomRobotics API */
  freedomRoboticsData: any;
}

// Demo page for freedom-robotics API driven visualizations
const FreedomRoboticsPage: ZonePage = (props: Props) => {

  const {freedomRoboticsData} = props;
  console.log('freedomRoboticsData:', freedomRoboticsData);
  const {
    name,
    platform,
    type,
    created,
    device
  } = freedomRoboticsData;

  return (
    <>
      <Typography
        type="Display"
        color={colors.blueGrey.darken3}
        marginBottom={'1rem'}
      >
        Freedom Robotics Demo
      </Typography>
      <Typography
        type="Title"
        color={colors.blueGrey.darken3}
        marginBottom={'1rem'}
      >
        Device ID: {device}
      </Typography>
      <Typography
        type="Subtitle"
        color={colors.blueGrey.darken3}
        marginBottom={'1rem'}
      >
        Device Name: {name}
      </Typography>
      <Typography
        type="Subtitle"
        color={colors.blueGrey.darken3}
        marginBottom={'1rem'}
      >
        Platform: {platform}
      </Typography>
    </>
  );
};

FreedomRoboticsPage.zone = FreedomRoboticsZone;

export async function getStaticProps() {
  let data = await freedomRoboticsAPIService();
  return {
    props: {
      freedomRoboticsData: data
    }
  };
}

// Default export is a requirement for nextjs to know this is the export for the page.
export default FreedomRoboticsPage;
