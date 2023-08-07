'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { AlertTriangle, Check, PartyPopper } from 'lucide-react';
import { DetailOverviewGraph } from './DetailOverviewGraph';
import { ServiceOwners } from './ServiceOwners';
import { Service } from '@/features/services/data/schema';
import { FC } from 'react';
import { motion } from 'framer-motion';
import {
  ANIMATE_VARIANT_BINDINGS,
  SLOW_TIMING,
  fadeDownVariants,
} from '@/lib/framer-motion/motion-variants';

type DetailsPageContentProps = {
  service: Service;
};

const DetailsPageContent: FC<DetailsPageContentProps> = ({
  service,
}: DetailsPageContentProps) => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ delay: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='dashboard-current-tab-content'
      className='flex-1 space-y-4 overflow-auto p-3 pt-10 sm:p-8 sm:pt-6'
    >
      <TooltipProvider>
        <Tabs defaultValue='overview' className='space-y-4'>
          <TabsList>
            <TabsTrigger value='overview'>Overview</TabsTrigger>
            <Tooltip delayDuration={250}>
              <TooltipTrigger asChild>
                <TabsTrigger value='overview'>Dependencies</TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon...</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={250}>
              <TooltipTrigger asChild>
                <TabsTrigger value='overview'>Stakeholders</TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon...</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip delayDuration={250}>
              <TooltipTrigger asChild>
                <TabsTrigger value='overview'>Notifications</TabsTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon...</p>
              </TooltipContent>
            </Tooltip>
          </TabsList>
          <TabsContent value='overview' className='space-y-4'>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Service Maturity
                  </CardTitle>
                  <Check className='text-green-500' color='currentColor' />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>82.1%</div>
                  <p className='text-xs text-green-600 text-muted-foreground'>
                    +20.1% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Production Readiness
                  </CardTitle>
                  <AlertTriangle
                    className='text-amber-500'
                    color='currentColor'
                  />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>65%</div>
                  <p className='text-xs text-muted-foreground'>
                    No change from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Security Standards
                  </CardTitle>
                  <PartyPopper
                    className='hover:animate-bounce'
                    color='currentColor'
                  />
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>100%</div>
                  <p className='text-xs text-muted-foreground'>
                    Perfect score!
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                  <CardTitle className='text-sm font-medium'>
                    Active Now
                  </CardTitle>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    className='h-4 w-4 text-muted-foreground'
                  >
                    <path d='M22 12h-4l-3 9L9 3l-3 9H2' />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className='text-2xl font-bold'>+573</div>
                  <p className='text-xs text-muted-foreground'>
                    +201 since last hour
                  </p>
                </CardContent>
              </Card>
            </div>
            <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-8'>
              <Card className='col-span-4'>
                <CardHeader>
                  <CardTitle>Stakeholder summary</CardTitle>
                  <CardDescription>
                    This service has{' '}
                    <b>
                      <u>6</u>
                    </b>{' '}
                    stakeholders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ServiceOwners />
                </CardContent>
              </Card>
              <Card className='col-span-4'>
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                </CardHeader>
                <CardContent className='pl-2'>
                  <DetailOverviewGraph />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </TooltipProvider>
    </motion.div>
  );
};

export default DetailsPageContent;
