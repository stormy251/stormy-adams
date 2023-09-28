'use client';

import { FC } from 'react';
import { Col, Grid } from '@tremor/react';
import { motion } from 'framer-motion';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/features/app/components/ui/alert';
import FlowDependencyGraph from '@/features/graph-playground/components/flow-graph/FlowDependencyGraph';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const GraphPlaygroundPageContent: FC = () => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ delay: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='graph-playground-content'
      className='flex grow flex-col gap-6 overflow-auto'
    >
      <Grid numItemsLg={6} className='mt-6 h-full gap-6'>
        {/* Main section */}
        <Col numColSpanLg={4} className=''>
          <FlowDependencyGraph />
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <div className='flex flex-col gap-4 rounded-lg border border-input p-4'>
            <Alert>
              <AlertTitle>Put service detail panel here</AlertTitle>
              <AlertDescription>
                Coming soon! This will be a small bar chart that shows some demo
                data
              </AlertDescription>
            </Alert>
          </div>
        </Col>
      </Grid>
    </motion.div>
  );
};

export default GraphPlaygroundPageContent;
