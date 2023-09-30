import * as React from 'react';
import { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';

import { Button } from '@/features/app/components/ui/button';
import { useGraphExplorerContext } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
} from '@/lib/framer-motion/motion-variants';

const FlowDependencyGraphDetailsPanel: FC = () => {
  const { selectedNodeId, setSelectedNodeId } = useGraphExplorerContext();

  return (
    <AnimatePresence mode='wait'>
      {selectedNodeId ? (
        <motion.div
          key={'details-panel'}
          variants={fadeDownVariants}
          {...ANIMATE_VARIANT_BINDINGS}
          className='flex h-full flex-col border border-input p-4'
        >
          <div className='flex items-center justify-between rounded-lg'>
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
          className='flex h-full flex-col justify-center align-middle'
        >
          <div className='flex items-center justify-center rounded-lg border border-input p-4'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            <p>Select an item to see insights!</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FlowDependencyGraphDetailsPanel;
