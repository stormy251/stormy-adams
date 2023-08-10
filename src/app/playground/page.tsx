import { Metadata } from 'next';

import PageWrapper from '@/components/app/PageWrapper';
import PlaygroundPageContent from '@/components/playground/PlaygroundPageContent';
import PlaygroundPageHeader from '@/components/playground/PlaygroundPageHeader';

export const metadata: Metadata = {
  title: 'Playground',
  description: 'A place to freely test out new concepts',
};

// Fetching data from API
async function getSomeData() {}

export default async function PlaygroundPage() {
  const someData = await getSomeData();

  return (
    <PageWrapper titleText='Playground'>
      <PlaygroundPageHeader />
      <PlaygroundPageContent />
    </PageWrapper>
  );
}
