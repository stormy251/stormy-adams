import React from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';
import TempZone from 'zones/temp';

// Main Page
const HomePage: ZonePage = () => {
  return (
    <Typography
      type="Display"
      color={colors.blueGrey.darken3}
      marginBottom={'1rem'}
    >
      Coming Soon...
    </Typography>
  );
};

HomePage.zone = TempZone;

// Default export is a requirement for nextjs to know this is the export for the page.
export default HomePage;
