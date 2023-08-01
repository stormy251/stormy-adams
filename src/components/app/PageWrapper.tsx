import {
  ANIMATE_VARIANT_BINDINGS,
  fadeUpVariants,
} from '@/lib/framer-motion/motion-variants';
import { motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { FC, PropsWithChildren } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import SideNavItems from '@/components/app/SideNavItems';
import LightDarkModeToggle from '@/components/app/LightDarkModeToggle';
import Image from 'next/image';

type PageWrapperProps = {
  titleText: string;
};

const PageWrapper: FC<PageWrapperProps & PropsWithChildren> = ({
  titleText,
  children,
}) => {
  return (
    <motion.div
      variants={fadeUpVariants}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='page-wrapper'
      className='flex h-full grow flex-col'
    >
      <div
        data-purpose-id='mobile-top-header'
        className='flex h-[3.5rem] items-center justify-between bg-primary-foreground px-3 transition-all sm:h-0 sm:overflow-hidden sm:opacity-0'
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
          <h2 className='text-xl font-semibold capitalize'>{titleText}</h2>
        </div>
        <Sheet>
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
      {children}
    </motion.div>
  );
};

export default PageWrapper;
