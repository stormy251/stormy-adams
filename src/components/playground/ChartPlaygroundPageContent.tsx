'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Card, Col, Grid } from '@tremor/react';

import {
  ANIMATE_VARIANT_BINDINGS,
  SLOW_TIMING,
  fadeDownVariants,
} from '@/lib/framer-motion/motion-variants';
import ChartView from '@/components/playground/charts/ChartView';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { BarChart } from 'lucide-react';
import PieChartView from '@/components/playground/charts/PieChartView';
import LineChartView from '@/components/playground/charts/LineChartView';

const ChartPlaygroundPageContent: FC = () => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ delay: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='playground-content'
      className='flex flex-col gap-6 overflow-auto'
    >
      <Grid numItemsLg={6} className='mt-6 gap-6'>
        {/* Main section */}
        <Col numColSpanLg={4}>
          <ChartView />
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <div className='flex flex-col gap-4 rounded-lg border border-input p-4'>
            <Alert>
              <BarChart className='h-4 w-4' />
              <AlertTitle>Small Bar chart</AlertTitle>
              <AlertDescription>
                Coming soon! This will be a small bar chart that shows some demo
                data
              </AlertDescription>
            </Alert>
            <div className='rounded-lg border border-input p-4'>
              <LineChartView />
            </div>

            <div className='rounded-lg border border-input p-4'>
              <PieChartView />
            </div>
          </div>
        </Col>
      </Grid>
    </motion.div>
  );
};

export default ChartPlaygroundPageContent;
