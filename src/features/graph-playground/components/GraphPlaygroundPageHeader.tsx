'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Triangle } from 'lucide-react';

import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const GraphPlaygroundPageHeader: FC = () => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ duration: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      className='mb-4 flex items-center justify-between rounded-lg rounded-bl-none rounded-br-none border border-b-4 border-input bg-primary-foreground p-4'
    >
      <div className='flex flex-col'>
        <h2 className='mt-10 scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0'>
          Graph Playground
        </h2>
        <p className='leading-7 [&:not(:first-child)]:mt-6'>
          These Graphs and visuals were created using{' '}
          <a
            target='_blank'
            href='https://reactflow.dev/'
            className='text-primary hover:underline'
          >
            React Flow
          </a>!
        </p>
      </div>
      <Triangle
        className='h-16 w-16 text-gray-300 dark:text-gray-500 sm:h-20 sm:w-20'
        color='currentColor'
      />
    </motion.div>
  );
};

export default GraphPlaygroundPageHeader;
