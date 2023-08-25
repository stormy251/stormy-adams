'use client';

import { FC, PropsWithChildren } from 'react';
import { motion } from 'framer-motion';

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
      className={`flex h-full w-full grow flex-col ${
        withoutOverflow ? 'overflow-hidden' : 'overflow-auto'
      }`}
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
