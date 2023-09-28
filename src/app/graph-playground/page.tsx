import { Metadata } from 'next';

import PageWrapper from '@/features/app/components/PageWrapper';
import GraphPlaygroundPageContent from '@/features/graph-playground/components/GraphPlaygroundPageContent';
import GraphPlaygroundPageHeader from '@/features/graph-playground/components/GraphPlaygroundPageHeader';

export const metadata: Metadata = {
  title: 'Graph Playground',
  description: 'An example of the different node-edge graph libraries.',
};

export default async function GraphPlaygroundPage() {
  return (
    <PageWrapper titleText='Graph Playground'>
      <section
        data-purpose-id='services-explorer-content'
        className='flex w-full grow flex-col px-4 py-4 md:container'
      >
        <GraphPlaygroundPageHeader />
        <GraphPlaygroundPageContent />
      </section>
    </PageWrapper>
  );
}
