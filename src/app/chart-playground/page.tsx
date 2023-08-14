import { Metadata } from 'next';

import PageWrapper from '@/components/app/PageWrapper';
import ChartPlaygroundPageHeader from '@/components/chart-playground/ChartPlaygroundPageHeader';
import ChartPlaygroundPageContent from '@/components/chart-playground/ChartPlaygroundPageContent';

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
      <section
        data-purpose-id='services-explorer-content'
        className='flex w-full grow flex-col px-4 py-4 md:container'
      >
        <ChartPlaygroundPageHeader />
        <ChartPlaygroundPageContent />
      </section>
    </PageWrapper>
  );
}
