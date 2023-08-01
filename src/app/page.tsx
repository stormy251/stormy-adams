'use client';

import PageWrapper from '@/components/app/PageWrapper';

export default function ProfilePage() {
  return (
    <PageWrapper>
      <section
        data-purpose-id='banner-header'
        className='h-[10rem] w-full bg-slate-200 transition-colors dark:bg-slate-500'
      ></section>
      <section
        data-purpose-id='profile-content'
        className='flex w-full grow flex-col px-4 py-4'
      >
        <p>Page content and layout should be put here.</p>
      </section>
    </PageWrapper>
  );
}
