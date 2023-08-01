import './global.css';
import type { Metadata } from 'next';
import AppThemeProvider from '@/contexts/AppThemeContext';
import LightDarkModeToggle from '@/components/app/LightDarkModeToggle';
import SideNavItems from '@/components/app/SideNavItems';
import Image from 'next/image';

export const metadata: Metadata = {
  title: "Stormy's App Playground",
  description: 'Meant to showcase, and test out different ideas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
              className='flex w-0 flex-col overflow-hidden border-input bg-primary-foreground opacity-0 transition-all sm:w-[16rem] sm:border-r sm:px-3 sm:py-4 sm:opacity-100'
            >
              <div
                data-purpose-id='side-bar-header'
                className='flex items-center gap-2 text-2xl font-bold'
              >
                <Image
                  className='rounded-full'
                  src='/storm_logo.jpg'
                  width={36}
                  height={36}
                  alt='Stormy profile logo'
                />
                <h2 className='text-xl font-bold'>Stormy Adams</h2>
              </div>
              <div
                data-purpose-id='side-bar-body'
                className='mt-5 flex grow flex-col'
              >
                <SideNavItems />
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
