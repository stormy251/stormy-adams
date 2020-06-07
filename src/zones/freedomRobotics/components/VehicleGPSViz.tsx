import React, {useState} from 'react';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import styled from 'styled-components';

const VehicleGPSVizContainer = styled.div`
  box-sizing: border-box;
  border: 1px solid ${colors.blueGrey.base};
  border-radius: 0.25rem;
  overflow: hidden;
  padding: 1rem;
  display: grid;
  grid-template-rows: 1.5rem 1fr;
  grid-gap: 0.5rem;
`;

const TabularDataContainer = styled.div`
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

const RedBox = styled.div`
  background-color: ${colors.red.base};
  height: 150px;
  width: 150px;
`;

interface Props {
  /** The total number of vehicle GPS topic data points */
  numOfDataPoints: number;
  /** This represents the data point that is the most recent -- TODO: type this to make it more clear what this  */
  mostRecentDataPoint: any;
  /** Boolean driving the UI state on if we should show the poll rate, or the total number of data points */
  realTime: boolean;
}

const VehicleGPSViz = (props: Props) => {
  const {numOfDataPoints, mostRecentDataPoint, realTime} = props;
  const [isShowingTable, setIsShowingTable] = useState(true);

  return (
    <VehicleGPSVizContainer>
      <SpaceBetweenRow>
        <Typography type="Title" color={colors.blueGrey.darken3}>
          Vehicle GPS Data
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
      {isShowingTable ? (
        <TabularDataContainer>
          <SpaceBetweenRow>
            <Typography type="Body" color={colors.yellow.darken4}>
              Altitude
            </Typography>
            <Typography type="Body" color={colors.yellow.darken4}>
              {mostRecentDataPoint.altitude}
            </Typography>
          </SpaceBetweenRow>
          <SpaceBetweenRow>
            <Typography type="Body" color={colors.red.darken4}>
              Latitude
            </Typography>
            <Typography type="Body" color={colors.red.darken4}>
              {mostRecentDataPoint.latitude}
            </Typography>
          </SpaceBetweenRow>
          <SpaceBetweenRow>
            <Typography type="Body" color={colors.deepPurple.darken4}>
              Longitude
            </Typography>
            <Typography type="Body" color={colors.deepPurple.darken4}>
              {mostRecentDataPoint.longitude}
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
        <RedBox />
      )}
    </VehicleGPSVizContainer>
  );
};

export default VehicleGPSViz;
