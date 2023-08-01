import { FC, useMemo } from 'react';
import { SidebarNav } from '@/components/ui/sidebar-nav';
import { LayoutDashboard, UserSquare } from 'lucide-react';

const SideNavItems: FC = () => {
  const sidebarNavItems = useMemo(() => {
    return [
      {
        href: '/',
        title: 'Profile',
        icon: <UserSquare />,
      },
      {
        href: '/dashboard',
        title: 'Dashboard',
        icon: <LayoutDashboard />,
      },
    ];
  }, []);

  return <SidebarNav items={sidebarNavItems} />;
};

export default SideNavItems;
