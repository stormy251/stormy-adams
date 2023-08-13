import { Metadata } from 'next';

import PageWrapper from '@/components/app/PageWrapper';
import ChartPlaygroundPageHeader from '@/components/playground/ChartPlaygroundPageHeader';
import ChartPlaygroundPageContent from '@/components/playground/ChartPlaygroundPageContent';

export const metadata: Metadata = {
  title: 'Chart Playground',
  description: 'Some example pages of charts and graphs.',
};

// Fetching data from API
async function getSomeData() {}

export default async function ChartPlaygroundPage() {
  const someData = await getSomeData();

  return (
    <PageWrapper titleText='Chart Playground'>
      <ChartPlaygroundPageHeader />
      <ChartPlaygroundPageContent />
    </PageWrapper>
  );
}
