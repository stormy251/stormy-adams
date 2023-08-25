'use client';

import { FC, useMemo } from 'react';
import { AreaChart, CircuitBoard, UserSquare } from 'lucide-react';
import { useParams } from 'next/navigation';

import { SidebarNav } from '@/features/app/components/ui/sidebar-nav';
import { SideNavGroupLabel } from '@/features/app/types/side-nav-types';

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
        linkGroupLabel: SideNavGroupLabel.SideProjects,
      },
      {
        href: '/chart-playground',
        title: 'Chart Playground',
        icon: <AreaChart />,
        linkGroupLabel: SideNavGroupLabel.SideProjects,
      },
    ];
  }, [serviceId]);

  return <SidebarNav items={sidebarNavItems} />;
};

export default SideNavItems;
