import React from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import HomeZone from 'zones/home';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import styled from 'styled-components';

const WorkCard = styled.div`
  border-radius: 0.25rem;
  padding: 1rem;
  border-style: solid;
  border-width: 1px;
  border-color: ${({color}) => color || colors.blueGrey.base};
  box-shadow: 0 3px 6px rgba(76, 175, 80, 0.16),
    0 3px 6px rgba(76, 175, 80, 0.23);
`;

const WorkCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin-top: 2rem;
`;

// Work History page
const WorkPage: ZonePage = () => {
  return (
    <>
      <Typography type="Display">Work Page</Typography>
      <WorkCardContainer>
        <WorkCard color={colors.green.base}>
          <Typography type="Title">Mode</Typography>
        </WorkCard>
      </WorkCardContainer>
    </>
  );
};

WorkPage.zone = HomeZone;

// Default export is a requirement for nextjs to know this is the export for the page.
export default WorkPage;
