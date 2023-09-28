'use client';

import { FC } from 'react';
import { Col, Grid } from '@tremor/react';
import { motion } from 'framer-motion';
import { BarChart } from 'lucide-react';

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/features/app/components/ui/alert';
import ChartView from '@/features/chart-playground/components/charts/ChartView';
import LineChartView from '@/features/chart-playground/components/charts/LineChartView';
import PieChartView from '@/features/chart-playground/components/charts/PieChartView';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

const ChartPlaygroundPageContent: FC = () => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ delay: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='chart-playground-content'
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
