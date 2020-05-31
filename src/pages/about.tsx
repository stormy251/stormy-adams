import React from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import HomeZone from 'zones/home';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';

// About page
const AboutPage: ZonePage = () => {
  return (
    <Typography type="Display" color={colors.white}>
      About Page
    </Typography>
  );
};

AboutPage.zone = HomeZone;

// Default export is a requirement for nextjs to know this is the export for the page.
export default AboutPage;
