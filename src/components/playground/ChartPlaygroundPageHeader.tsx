'use client';

import {
  ANIMATE_VARIANT_BINDINGS,
  SLOW_TIMING,
  fadeDownVariants,
} from '@/lib/framer-motion/motion-variants';
import { motion } from 'framer-motion';
import { AreaChart } from 'lucide-react';
import { FC } from 'react';

const ChartPlaygroundPageHeader: FC = () => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ duration: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      className='mb-4 flex items-center justify-between rounded-lg rounded-bl-none rounded-br-none border border-b-4 border-input bg-primary-foreground p-4'
    >
      <div className='flex flex-col'>
        <h2 className='mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          Chart Playground
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          These charts and visuals were created using{' '}
          <a
            target='_blank'
            href='https://tailwindcss.com/'
            className='text-primary hover:underline'
          >
            tailwind
          </a>{' '}
          and{' '}
          <a
            target='_blank'
            href='https://www.tremor.so/'
            className='text-primary hover:underline'
          >
            Tremor
          </a>
          !
        </p>
      </div>
      <AreaChart
        className='h-16 w-16 text-gray-300 dark:text-gray-500 sm:h-20 sm:w-20'
        color='currentColor'
      />
    </motion.div>
  );
};

export default ChartPlaygroundPageHeader;
