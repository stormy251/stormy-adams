import React from 'react';
import {ZonePage} from 'lib/types/ZonePage';
import HomeZone from 'zones/home';
import Typography from 'zones/app/components/Typography';
import {colors} from 'lib/theme';

// Work History page
const WorkPage: ZonePage = () => {
  return (
    <Typography type="Display" color={colors.white}>
      Work Page
    </Typography>
  );
};

WorkPage.zone = HomeZone;

// Default export is a requirement for nextjs to know this is the export for the page.
export default WorkPage;
