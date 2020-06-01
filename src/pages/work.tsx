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
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 0.5rem;
`;

const WorkCardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
  margin-top: 2rem;
  max-width: 300px;
`;

const WorkCardDetails = styled.ul`
  margin-block-start: 0;
  margin-block-end: 0;
  padding-inline-start: 2rem;
`;

// Work History page
const WorkPage: ZonePage = () => {
  return (
    <>
      <Typography type="Display">Work Page</Typography>
      <WorkCardContainer>
        <WorkCard color={colors.green.base}>
          <Typography type="Title">Mode</Typography>
          <Typography type="Subtitle">
            Frontend Engineer | San Francisco, CA | 2019- (June) 2020
          </Typography>
          <Typography type="Section">
            I was part of the visual analytics team primarily focused on
            improving the chart rendering, and the report creation services.
          </Typography>
          <WorkCardDetails>
            <li>
              <span>
                <Typography type="Body">
                  Implemented a typescript based data processing flow that
                  allowed the creation of visualizations with complex data
                  types, and empty/null values.
                </Typography>
              </span>
            </li>
            <li>
              <span>
                <Typography type="Body">
                  Improved the in app SQL editor with features to provide better
                  suggestions for auto completion and theme customizations.
                </Typography>
              </span>
            </li>
          </WorkCardDetails>
        </WorkCard>
        <WorkCard color={colors.black}>
          <Typography type="Title">Flickr</Typography>
          <Typography type="Subtitle">
            Frontend Engineer | San Francisco, CA | 2018 - (Dec) 2019
          </Typography>
          <Typography type="Section">
            I focused on customer engagement, and Flickr’s applications
            authentication services.
          </Typography>
          <WorkCardDetails>
            <li>
              <span>
                <Typography type="Body">
                  Created a new authentication service
                  (https://identity.flickr.com), as well as migrated millions of
                  existing users from the legacy provider.
                </Typography>
              </span>
            </li>
            <li>
              <span>
                <Typography type="Body">
                  Released several internationalized pages/features to a global
                  audience, after running A/B trails to determine the top
                  performing variant.
                </Typography>
              </span>
            </li>
          </WorkCardDetails>
        </WorkCard>
        <WorkCard color={colors.black}>
          <Typography type="Title">Yahoo</Typography>
          <Typography type="Subtitle">
            Software Engineer | Richardson, TX | 2016 - 2018
          </Typography>
          <Typography type="Section">
            I was a part of the Yahoo network infrastructure team, where I
            mainly focused on creating rich intuitive tooling to give insights
            into our live network devices.
          </Typography>
          <WorkCardDetails>
            <li>
              <span>
                <Typography type="Body">
                  Key contributor, on a python-based network telemetry system
                  for Yahoo’s distributed “Backbone” network.
                </Typography>
              </span>
            </li>
            <li>
              <span>
                <Typography type="Body">
                  Created several internal web applications that
                  monitored/directed live traffic data.
                </Typography>
              </span>
            </li>
          </WorkCardDetails>
        </WorkCard>
      </WorkCardContainer>
    </>
  );
};

WorkPage.zone = HomeZone;

// Default export is a requirement for nextjs to know this is the export for the page.
export default WorkPage;
