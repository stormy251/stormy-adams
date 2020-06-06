import FreedomRoboticsLayout from './FreedomRoboticsLayout';
import {Zone} from 'lib/types/Zone';

const FreedomRoboticsZone: Zone = {
  zoneInit: async () => {
    return {};
  },
  LayoutComponent: FreedomRoboticsLayout
};

export default FreedomRoboticsZone;
