import { FC } from 'react';
import Image from 'next/image';

import LightDarkModeToggle from '@/features/app/components/side-nav/LightDarkModeToggle';
import SearchCommandButton from '@/features/app/components/side-nav/SearchCommandButton';
import SideNavItems from '@/features/app/components/side-nav/SideNavItems';

const AppSideNav: FC = () => {
  return (
    <aside
      data-purpose-id='side-bar'
      className='flex w-0 flex-col overflow-hidden border-input  opacity-0 transition-all sm:w-[16rem] sm:min-w-[16rem] sm:border-r sm:px-3 sm:py-4 sm:opacity-100'
    >
      <div
        data-purpose-id='side-bar-header'
        className='flex items-center gap-2 text-2xl font-bold'
      >
        <Image
          className='rounded-full'
          src='/storm_logo.jpg'
          width={36}
          height={36}
          alt='Stormy profile logo'
        />
        <h2 className='text-xl font-bold'>Stormy Adams</h2>
      </div>
      <div data-purpose-id='side-bar-body' className='mt-2 flex grow flex-col'>
        <SearchCommandButton />
        <SideNavItems />
      </div>
      <div
        data-purpose-id='side-bar-footer'
        className='flex h-[3rem] items-end justify-end gap-2'
      >
        <LightDarkModeToggle />
      </div>
    </aside>
  );
};

export default AppSideNav;
