'use client';

import { FC } from 'react';
import * as React from 'react';
import { Col, Grid } from '@tremor/react';
import { motion } from 'framer-motion';

import FlowDependencyGraph from '@/features/graph-playground/components/flow-graph/FlowDependencyGraph';
import FlowDependencyGraphDetailsPanel from '@/features/graph-playground/components/flow-graph/FlowDependencyGraphDetailsPanel';
import { GraphExplorerContextProvider } from '@/features/graph-playground/contexts/GraphExplorerContext';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const GraphPlaygroundPageContent: FC = () => {
  return (
    <GraphExplorerContextProvider>
      <motion.div
        variants={fadeDownVariants}
        transition={{ delay: SLOW_TIMING }}
        {...ANIMATE_VARIANT_BINDINGS}
        data-purpose-id='graph-playground-content'
        className='flex grow flex-col gap-6 overflow-auto'
      >
        <Grid numItemsLg={6} className='h-full gap-6'>
          {/* Graph Explorer section */}
          <Col
            numColSpanLg={4}
            className='flex h-full w-full grow rounded-lg border border-input'
          >
            <FlowDependencyGraph />
          </Col>

          {/* Selected Information Panel */}
          <Col numColSpanLg={2} className='overflow-hidden'>
            <FlowDependencyGraphDetailsPanel />
          </Col>
        </Grid>
      </motion.div>
    </GraphExplorerContextProvider>
  );
};

export default GraphPlaygroundPageContent;
