'use client';

import PageWrapper from '@/components/app/PageWrapper';

export default function PlaygroundPage() {
  return (
    <PageWrapper titleText='Playground'>
      <section
        data-purpose-id='playground-content'
        className='flex w-full grow flex-col px-4 py-4'
      >
        <p>Place services mock up experience here</p>
      </section>
    </PageWrapper>
  );
}
