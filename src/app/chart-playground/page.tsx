import { Metadata } from 'next';

import PageWrapper from '@/features/app/components/PageWrapper';
import ChartPlaygroundPageContent from '@/features/chart-playground/components/ChartPlaygroundPageContent';
import ChartPlaygroundPageHeader from '@/features/chart-playground/components/ChartPlaygroundPageHeader';

export const metadata: Metadata = {
  title: 'Chart Playground',
  description: 'Some example pages of charts and graphs.',
};

export default async function ChartPlaygroundPage() {
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
