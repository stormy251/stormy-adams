'use client';

import { FC, useMemo } from 'react';
import { SidebarNav } from '@/components/ui/sidebar-nav';
import { AreaChart, CircuitBoard, Smile, UserSquare } from 'lucide-react';
import { useParams } from 'next/navigation';

const SideNavItems: FC = () => {
  const { serviceId } = useParams();

  const sidebarNavItems = useMemo(() => {
    return [
      {
        href: '/',
        title: 'Profile',
        icon: <UserSquare />,
      },
      {
        href: '/services',
        alias: `/services/${serviceId}`,
        title: 'Services',
        icon: <CircuitBoard />,
      },
      {
        href: '/chart-playground',
        title: 'Chart Playground',
        icon: <AreaChart />,
      },
    ];
  }, [serviceId]);

  return <SidebarNav items={sidebarNavItems} />;
};

export default SideNavItems;
