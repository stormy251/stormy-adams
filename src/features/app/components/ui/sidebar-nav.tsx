'use client';

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/features/app/components/ui/button';
import { cn } from '@/lib/shadcn-ui/utils';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    alias?: string;
    icon: ReactNode;
    linkGroupLabel?: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();
  const renderedLabels = new Map();

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
                pathname === item.href || pathname === item.alias
                  ? 'bg-gray-200 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-600'
                  : 'hover:bg-gray-200 hover:underline dark:hover:bg-gray-600',
                'justify-start gap-2'
              )}
            >
              <span>{item.icon}</span>
              <span>{item.title}</span>
            </Link>
          </React.Fragment>
        );
      })}
    </nav>
  );
}
