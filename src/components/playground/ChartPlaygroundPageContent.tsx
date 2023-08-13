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
import { BarChart, LineChart, PieChart } from 'lucide-react';

const ChartPlaygroundPageContent: FC = () => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ delay: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='playground-content'
      className='flex flex-col gap-6 overflow-auto p-8 pt-10 md:container sm:p-8 sm:pt-6'
    >
      <Grid numItemsLg={6} className='mt-6 gap-6'>
        {/* Main section */}
        <Col numColSpanLg={4}>
          <Card className='h-full'>
            <ChartView />
          </Card>
        </Col>

        {/* KPI sidebar */}
        <Col numColSpanLg={2}>
          <div className='space-y-6'>
            <Card>
              <Alert>
                <BarChart className='h-4 w-4' />
                <AlertTitle>Small Bar chart</AlertTitle>
                <AlertDescription>
                  Coming soon! This will be a small bar chart that shows some
                  demo data
                </AlertDescription>
              </Alert>
            </Card>
            <Card>
              <Alert>
                <LineChart className='h-4 w-4' />
                <AlertTitle>Small Line chart</AlertTitle>
                <AlertDescription>
                  Coming soon! This will be a small line chart that shows some
                  demo data
                </AlertDescription>
              </Alert>
            </Card>
            <Card>
              <Alert>
                <PieChart className='h-4 w-4' />
                <AlertTitle>Small pie chart</AlertTitle>
                <AlertDescription>
                  Coming soon! This will be a small pie chart that shows some
                  demo data
                </AlertDescription>
              </Alert>
            </Card>
          </div>
        </Col>
      </Grid>
    </motion.div>
  );
};

export default ChartPlaygroundPageContent;
