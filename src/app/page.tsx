'use client';

import LightDarkModeToggle from '@/components/app/LightDarkModeToggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className='flex h-[100vh] w-[100vw]'>
      <div
        data-purpose-id='side-bar'
        className='flex w-[20rem] flex-col border-r-2 border-gray-200 px-3 py-4'
      >
        <div
          data-purpose-id='side-bar-header'
          className='flex items-center gap-1 text-2xl font-bold'
        >
          <Zap className='h-[1.6rem] w-[1.6rem] rotate-12' />
          <h2 className='text-xl font-semibold tracking-tight'>
            App Playground
          </h2>
        </div>
        <div
          data-purpose-id='side-bar-body'
          className='flex grow flex-col gap-2'
        >
          <Input
            className='mt-4'
            placeholder='Search'
            onFocus={() => {
              console.log('search was focused');
            }}
          />
        </div>
        <div
          data-purpose-id='side-bar-footer'
          className='flex h-[3rem] items-end justify-end gap-2'
        >
          <LightDarkModeToggle />
        </div>
      </div>
      <div
        data-purpose-id='page-content-container'
        className='flex h-full grow flex-col'
      >
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
      </div>
    </div>
  );
}
