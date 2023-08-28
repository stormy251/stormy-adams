import type { Metadata } from 'next';

import CommandMenu from '@/features/app/components/CommandMenu';
import AppMobileTopNav from '@/features/app/components/mobile-top-nav/AppMobileTopNav';
import AppSideNav from '@/features/app/components/side-nav/AppSideNav';
import { Toaster } from '@/features/app/components/ui/toaster';
import { AppContextProvider } from '@/features/app/contexts/AppContext';
import ThemeProvider from '@/features/app/contexts/ThemeContext';

import './global.css';

export const dynamic = 'force-dynamic';

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
      <body className='overflow-hidden'>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <AppContextProvider>
            <main
              data-purpose-id='app-root-layout'
              className='flex h-[100dvh] w-[100dvw] overflow-hidden'
            >
              <AppSideNav />
              <div className='flex h-full grow flex-col'>
                <AppMobileTopNav />
                {children}
              </div>
            </main>
            <CommandMenu />
            <Toaster />
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
