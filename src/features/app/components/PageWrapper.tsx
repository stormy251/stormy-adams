'use client';

import { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Image from 'next/image';

import LightDarkModeToggle from '@/features/app/components/side-nav/LightDarkModeToggle';
import SideNavItems from '@/features/app/components/side-nav/SideNavItems';
import { Button } from '@/features/app/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/features/app/components/ui/sheet';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeVariants,
} from '@/lib/framer-motion/motion-variants';

type PageWrapperProps = {
  titleText: string;
  withoutOverflow?: boolean;
};

const PageWrapper: FC<PageWrapperProps & PropsWithChildren> = ({
  children,
  withoutOverflow,
}) => {
  return (
    <motion.div
      variants={fadeVariants}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='page-wrapper'
      className='flex h-full grow flex-col'
    >
      <div
        data-purpose-id='mobile-top-header'
        className='flex h-[3.5rem] min-h-[3.5rem] items-center justify-between border-b border-input bg-primary-foreground px-3 transition-all sm:h-0 sm:min-h-0 sm:overflow-hidden sm:opacity-0'
      >
        <Sheet>
          <div
            data-purpose-id='page-brand-header'
            className='flex items-center gap-2 text-2xl font-bold'
          >
            <SheetTrigger asChild>
              <span className='cursor-pointer'>
                <Image
                  className='rounded-full'
                  src='/storm_logo.jpg'
                  width={36}
                  height={36}
                  alt='Stormy profile logo'
                />
              </span>
            </SheetTrigger>

            <h2 className='text-xl font-semibold capitalize'>Stormy Adams</h2>
          </div>
          <SheetTrigger asChild>
            <Button variant='ghost' size='icon'>
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side='left'
            className='flex w-[16rem] flex-col bg-primary-foreground px-4 py-4'
          >
            <div className='flex items-center gap-2 text-2xl font-bold'>
              <Image
                className='rounded-full'
                src='/storm_logo.jpg'
                width={36}
                height={36}
                alt='Stormy profile logo'
              />

              <h2 className='text-xl font-bold tracking-tight'>Stormy Adams</h2>
            </div>
            <div className='flex grow flex-col'>
              <SideNavItems />
            </div>
            <div className='flex h-[3rem] items-end justify-end gap-2'>
              <LightDarkModeToggle />
            </div>
          </SheetContent>
        </Sheet>
      </div>
      <div
        className={`flex h-full w-full grow flex-col ${
          withoutOverflow ? 'overflow-hidden' : 'overflow-auto'
        }`}
      >
        {children}
      </div>
    </motion.div>
  );
};

export default PageWrapper;