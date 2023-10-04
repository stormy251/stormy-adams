import * as React from 'react';
import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Lightbulb, X } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  fadeVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const FlowDependencyGraphDetailsPanel: FC = () => {
  const { selectedNodeId, setSelectedNodeId } = useGraphExplorerContext();

  return (
    <motion.div
      variants={fadeVariants}
      transition={{ delay: SLOW_TIMING * 4 }}
      {...ANIMATE_VARIANT_BINDINGS}
      className='flex h-full flex-col rounded-lg border border-input'
    >
      <AnimatePresence mode='wait'>
        {selectedNodeId ? (
          <motion.div
            key={'details-panel'}
            variants={fadeDownVariants}
            {...ANIMATE_VARIANT_BINDINGS}
            className='flex h-full flex-col p-4'
          >
            <div className='flex items-center justify-between'>
              <h1>Selected ID: {selectedNodeId}</h1>
              <Button
                size='icon'
                variant='outline'
                onClick={() => {
                  setSelectedNodeId(null);
                }}
              >
                <X />
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={'empty-panel'}
            variants={fadeDownVariants}
            {...ANIMATE_VARIANT_BINDINGS}
            className='flex h-full flex-col justify-center p-4 align-middle'
          >
            <section className='flex flex-col gap-2 rounded-lg border border-input bg-accent p-6'>
              <Lightbulb className='mx-auto h-12 w-12 text-amber-400' />
              <div className='flex items-center justify-center p-4'>
                <p className='track-wide text-lg font-semibold'>
                  Click an item to see insights!
                </p>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FlowDependencyGraphDetailsPanel;
