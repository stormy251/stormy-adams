import { FC, useMemo } from 'react';
import { SidebarNav } from '@/components/ui/sidebar-nav';
import { Smile, UserSquare } from 'lucide-react';

const SideNavItems: FC = () => {
  const sidebarNavItems = useMemo(() => {
    return [
      {
        href: '/',
        title: 'Profile',
        icon: <UserSquare />,
      },
      {
        href: '/playground',
        title: 'Playground',
        icon: <Smile />,
      },
    ];
  }, []);

  return <SidebarNav items={sidebarNavItems} />;
};

export default SideNavItems;
