'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ReactNode } from 'react';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
    icon: ReactNode;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn('flex flex-col space-x-0 space-y-1', className)}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-gray-200 hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-600'
              : 'hover:bg-gray-200 hover:underline dark:hover:bg-gray-500',
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
