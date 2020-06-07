import React, {useState} from 'react';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';
import {
  ANIMATE_VARIANT_NAME,
  EXIT_VARIANT_NAME,
  fadeUpVariants,
  INITIAL_VARIANT_NAME
} from 'lib/framer-motion/motion-variants';

const VehicleSonarVizContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid ${colors.blueGrey.base};
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1.5rem 1fr;
  grid-gap: 0.5rem;
`;

const TabularDataContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(auto-fill, 1rem);
  grid-gap: 0.5rem;
`;

const SpaceBetweenRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const RightSideContentContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;

  * {
    margin-right: 0.5rem;
  }
`;

const CenteredContainer = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  width: 100%;
`;

const BlueBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.blue.base};
  padding: 0.5rem;
  height: 150px;
  width: 150px;
`;

interface Props {
  /** The total number of vehicle sonar topic data points */
  numOfDataPoints: number;
  /** This represents the data point that is the most recent -- TODO: type this to make it more clear what this  */
  mostRecentDataPoint: any;
  /** Boolean driving the UI state on if we should show the poll rate, or the total number of data points */
  realTime: boolean;
}

const VehicleSonarViz = (props: Props) => {
  const {numOfDataPoints, mostRecentDataPoint, realTime} = props;
  const [isShowingTable, setIsShowingTable] = useState(true);

  return (
    <VehicleSonarVizContainer>
      <SpaceBetweenRow>
        <Typography type="Title" color={colors.blueGrey.darken3}>
          Vehicle Sonar Data
        </Typography>
        <RightSideContentContainer>
          <ButtonContainer>
            <button onClick={() => setIsShowingTable(true)}>table</button>
            <button onClick={() => setIsShowingTable(false)}>graph</button>
          </ButtonContainer>
          {realTime ? (
            <Typography type="Subtitle" color={colors.blueGrey.darken3}>
              0.1hz
            </Typography>
          ) : (
            <Typography type="Subtitle" color={colors.blueGrey.darken3}>
              Total data points: {numOfDataPoints}
            </Typography>
          )}
        </RightSideContentContainer>
      </SpaceBetweenRow>
      <AnimatePresence exitBeforeEnter>
        {isShowingTable ? (
          <TabularDataContainer
            variants={fadeUpVariants}
            initial={INITIAL_VARIANT_NAME}
            animate={ANIMATE_VARIANT_NAME}
            exit={EXIT_VARIANT_NAME}
          >
            <SpaceBetweenRow>
              <Typography type="Body" color={colors.yellow.darken4}>
                Height
              </Typography>
              <Typography type="Body" color={colors.yellow.darken4}>
                {mostRecentDataPoint.height}
              </Typography>
            </SpaceBetweenRow>
            <SpaceBetweenRow>
              <Typography type="Body" color={colors.indigo.darken4}>
                Width
              </Typography>
              <Typography type="Body" color={colors.indigo.darken4}>
                {mostRecentDataPoint.width}
              </Typography>
            </SpaceBetweenRow>
            <SpaceBetweenRow>
              <Typography type="Body" color={colors.red.darken4}>
                Is_bigendian
              </Typography>
              <Typography type="Body" color={colors.red.darken4}>
                {mostRecentDataPoint.is_bigendian ? 'true' : 'false'}
              </Typography>
            </SpaceBetweenRow>
            <SpaceBetweenRow>
              <Typography type="Body" color={colors.green.darken4}>
                Is_dense
              </Typography>
              <Typography type="Body" color={colors.green.darken4}>
                {mostRecentDataPoint.is_dense ? 'true' : 'false'}
              </Typography>
            </SpaceBetweenRow>
            <SpaceBetweenRow>
              <Typography type="Body" color={colors.pink.darken4}>
                Point_step
              </Typography>
              <Typography type="Body" color={colors.pink.darken4}>
                {mostRecentDataPoint.point_step}
              </Typography>
            </SpaceBetweenRow>
            <SpaceBetweenRow>
              <Typography type="Body" color={colors.blue.darken4}>
                Row_step
              </Typography>
              <Typography type="Body" color={colors.blue.darken4}>
                {mostRecentDataPoint.row_step}
              </Typography>
            </SpaceBetweenRow>
            <SpaceBetweenRow>
              <Typography type="Body" color={colors.deepPurple.darken4}>
                Data
              </Typography>
              <Typography type="Body" color={colors.deepPurple.darken4}>
                {mostRecentDataPoint.data}
              </Typography>
            </SpaceBetweenRow>
            <SpaceBetweenRow>
              <Typography type="Body" color={colors.deepOrange.darken4}>
                Time Taken
              </Typography>
              <Typography type="Body" color={colors.deepOrange.darken4}>
                {mostRecentDataPoint.timeStamp}
              </Typography>
            </SpaceBetweenRow>
          </TabularDataContainer>
        ) : (
          <CenteredContainer
            variants={fadeUpVariants}
            initial={INITIAL_VARIANT_NAME}
            animate={ANIMATE_VARIANT_NAME}
            exit={EXIT_VARIANT_NAME}
          >
            <BlueBox>
              <Typography type="Title" color={colors.white} align="center">
                Line Viz Here
              </Typography>
            </BlueBox>
          </CenteredContainer>
        )}
      </AnimatePresence>
    </VehicleSonarVizContainer>
  );
};

export default VehicleSonarViz;
