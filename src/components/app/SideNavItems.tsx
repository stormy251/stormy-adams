import { FC, useMemo } from 'react';
import { SidebarNav } from '@/components/ui/sidebar-nav';

const SideNavItems: FC = () => {
  const sidebarNavItems = useMemo(() => {
    return [
      {
        href: '/',
        title: 'Profile',
      },
      {
        href: '/dashboard',
        title: 'Dashboard',
      },
    ];
  }, []);

  return <SidebarNav items={sidebarNavItems} />;
};

export default SideNavItems;
