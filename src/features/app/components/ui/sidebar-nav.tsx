'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/features/app/components/ui/button';
import { useAppContext } from '@/features/app/contexts/AppContext';
import {
  ANIMATE_VARIANT_BINDINGS,
  fadeScaleVariants,
} from '@/lib/framer-motion/motion-variants';
import { cn } from '@/lib/shadcn-ui/utils';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    alias?: string[];
    icon: ReactNode;
    linkGroupLabel?: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const { sideNavLabelPing, setSideNavLabelPing } = useAppContext();
  const [isPingingLabelGroup, setIsPingingLabelGroup] = useState(false);
  const pathname = usePathname();
  const renderedLabels = new Map();

  useEffect(() => {
    if (sideNavLabelPing !== null) {
      setIsPingingLabelGroup(true);
      setTimeout(() => {
        setIsPingingLabelGroup(false);
        setSideNavLabelPing(null);
      }, 5000);
    }
  }, [sideNavLabelPing, setSideNavLabelPing]);

  return (
    <nav className={cn('mt-2 flex flex-col gap-2', className)} {...props}>
      {items.map((item, index) => {
        let shouldRenderLabel = false;
        const hasRenderedLabel = renderedLabels.get(item.linkGroupLabel);
        if (!hasRenderedLabel) {
          shouldRenderLabel = true;
          renderedLabels.set(item.linkGroupLabel, true);
        }
        return (
          <React.Fragment key={index}>
            {shouldRenderLabel && item?.linkGroupLabel && (
              <h4 className='mb-1 mt-2 font-semibold tracking-wide text-muted-foreground'>
                {item.linkGroupLabel}
              </h4>
            )}
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                pathname === item.href || item.alias?.includes(pathname)
                  ? 'bg-gray-200 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'hover:bg-gray-200 hover:underline dark:hover:bg-gray-600',
                'justify-between'
              )}
            >
              <div className='flex items-center gap-2'>
                <span>{item.icon}</span>
                <span>{item.title}</span>
              </div>
              <AnimatePresence mode='wait'>
                {isPingingLabelGroup &&
                  item?.linkGroupLabel === sideNavLabelPing && (
                    <motion.div
                      variants={fadeScaleVariants}
                      {...ANIMATE_VARIANT_BINDINGS}
                      className='relative flex h-[0.6rem] w-[0.6rem] items-center justify-center'
                    >
                      <span className='absolute h-[0.75rem] w-[0.75rem] animate-ping rounded-full bg-primary opacity-75' />
                      <span className='h-[0.5rem] w-[0.5rem] rounded-full bg-primary' />
                    </motion.div>
                  )}
              </AnimatePresence>
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
