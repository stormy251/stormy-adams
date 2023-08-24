'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';

import { DateRangePicker } from '@/features/app/components/common/DateRangePicker';
import BackToServicesButton from '@/features/services/components/details-page/BackToServicesButton';
import ServiceDescriptionHoverCard from '@/features/services/components/details-page/ServiceDescriptionHoverCard';
import SharePageButton from '@/features/services/components/details-page/SharePageButton';
import { Service } from '@/features/services/data/schema';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeDownVariants,
  SLOW_TIMING,
} from '@/lib/framer-motion/motion-variants';

type DetailsPageHeaderProps = {
  service: Service;
};

const DetailsPageHeader: FC<DetailsPageHeaderProps> = ({ service }) => {
  return (
    <motion.div
      variants={fadeDownVariants}
      transition={{ duration: SLOW_TIMING * 2 }}
      {...ANIMATE_VARIANT_BINDINGS}
      data-purpose-id='dashboard-header'
      className='flex w-full items-center justify-between space-y-2 border-b border-t border-input px-8 py-3'
    >
      <div className='flex items-center gap-4'>
        <BackToServicesButton />
        <span className='mx-2 h-12 w-[1px] rounded-lg bg-input' />
        <h2 className='text-3xl font-bold capitalize tracking-tight'>
          {service.title}
        </h2>
        <ServiceDescriptionHoverCard description={service.description} />
      </div>

      <div className='flex items-center space-x-2'>
        <DateRangePicker />
        <SharePageButton />
      </div>
    </motion.div>
  );
};

export default DetailsPageHeader;
