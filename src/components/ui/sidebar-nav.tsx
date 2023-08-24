'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    alias?: string;
    icon: ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav className={cn('mt-2 flex flex-col gap-2', className)} {...props}>
      {items.map((item) => (
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
      ))}
    </nav>
  );
}
