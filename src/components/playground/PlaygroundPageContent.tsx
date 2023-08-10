'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import {
  ANIMATE_VARIANT_BINDINGS,
  SLOW_TIMING,
  fadeDownVariants,
} from '@/lib/framer-motion/motion-variants';

const PlaygroundPageContent: FC = () => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ delay: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='playground-content'
      className='flex-1 space-y-4 overflow-auto p-8 pt-10 sm:p-8 sm:pt-6'
    >
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
      <p>Hello World!</p>
    </motion.div>
  );
};

export default PlaygroundPageContent;
