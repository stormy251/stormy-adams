import {
  ANIMATE_VARIANT_BINDINGS,
  fadeUpVariants,
} from '@/lib/framer-motion/motion-variants';
import { motion } from 'framer-motion';
import { FC, PropsWithChildren } from 'react';

const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
  return (
    <motion.div
      variants={fadeUpVariants}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='page-wrapper'
      className='flex h-full grow flex-col'
    >
      {children}
    </motion.div>
  );
};

export default PageWrapper;
