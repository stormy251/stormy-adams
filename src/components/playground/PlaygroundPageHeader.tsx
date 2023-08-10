'use client';

import { motion } from 'framer-motion';
import { FC } from 'react';
import {
  ANIMATE_VARIANT_BINDINGS,
  SLOW_TIMING,
  fadeDownVariants,
} from '@/lib/framer-motion/motion-variants';

const PlaygroundPageHeader: FC = () => {
  return (
    <motion.header
      variants={fadeDownVariants}
      transition={{ duration: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='playground-header'
      className='flex w-full items-center space-y-2 border-b border-t border-input px-8 py-3'
    >
      <div className='flex items-center gap-4'>
        <h2 className='text-3xl font-bold capitalize tracking-tight'>
          Playground
        </h2>
      </div>
    </motion.header>
  );
};

export default PlaygroundPageHeader;
