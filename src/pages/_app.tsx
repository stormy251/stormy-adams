import {ZonePage} from 'lib/types/ZonePage';
import {NextRouter} from 'next/router';
import React from 'react';
import 'lib/global-styles.css'; // This will ensure that the global-styles are positioned properly in the head.
import AppLayout from 'zones/app/AppLayout';
import AppZone from 'zones/app';

interface Props {
  Component?: ZonePage;
  pageProps?: any;
  router: NextRouter;
}

const NextApp = ({Component, pageProps, router}: Props) => {
  const {LayoutComponent} = Component.zone;

  return (
    <AppLayout layoutKey={LayoutComponent.name} {...pageProps}>
      <LayoutComponent {...pageProps} transitionKey={router.asPath}>
        <Component {...pageProps} />
      </LayoutComponent>
    </AppLayout>
  );
};

NextApp.getInitialProps = async function ({Component, ctx}) {
  let pageProps = {};
  let pageZoneInitData = {};
  const appZoneInitData = await AppZone.zoneInit();

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }

  if (Component.zone.zoneInit) {
    pageZoneInitData = await Component.zone.zoneInit(ctx);
  }

  return {
    pageProps: {
      ...pageProps,
      ...appZoneInitData,
      ...pageZoneInitData
    }
  };
};

// Default export is a requirement for nextjs to know this is the export for the page.
export default NextApp;
