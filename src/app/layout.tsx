import './global.css';
import type { Metadata } from 'next';
import { Zap } from 'lucide-react';
import { SidebarNav } from '@/components/ui/sidebar-nav';
import AppThemeProvider from '@/contexts/AppThemeContext';
import { useMemo } from 'react';
import LightDarkModeToggle from '@/components/app/LightDarkModeToggle';

export const metadata: Metadata = {
  title: "Stormy's App Playground",
  description: 'Meant to showcase, and test out different ideas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body>
        <AppThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <main
            data-purpose-id='app-root-layout'
            className='flex h-[100vh] w-[100vw]'
          >
            <aside
              data-purpose-id='side-bar'
              className='flex w-[16rem] flex-col border-r border-input px-3 py-4'
            >
              <div
                data-purpose-id='side-bar-header'
                className='flex items-center gap-1 text-2xl font-bold'
              >
                <Zap className='h-[2rem] w-[2rem]' />
                <h2 className='text-xl font-semibold tracking-tight'>
                  App Playground
                </h2>
              </div>
              <div
                data-purpose-id='side-bar-body'
                className='mt-5 flex grow flex-col'
              >
                <SidebarNav items={sidebarNavItems} />
              </div>
              <div
                data-purpose-id='side-bar-footer'
                className='flex h-[3rem] items-end justify-end gap-2'
              >
                <LightDarkModeToggle />
              </div>
            </aside>
            {children}
          </main>
        </AppThemeProvider>
      </body>
    </html>
  );
}
