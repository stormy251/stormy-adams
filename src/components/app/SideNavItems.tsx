'use client';

import { FC, useMemo } from 'react';
import { SidebarNav } from '@/components/ui/sidebar-nav';
import { CircuitBoard, Triangle, UserSquare } from 'lucide-react';
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
    ];
  }, [serviceId]);

  return <SidebarNav items={sidebarNavItems} />;
};

export default SideNavItems;
