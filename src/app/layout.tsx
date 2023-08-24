import type { Metadata } from 'next';

import CommandMenu from '@/features/app/components/CommandMenu';
import AppSideNav from '@/features/app/components/side-nav/AppSideNav';
import { Toaster } from '@/features/app/components/ui/toaster';
import { AppContextProvider } from '@/features/app/contexts/AppContext';
import ThemeProvider from '@/features/app/contexts/ThemeContext';

import './global.css';

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
              className='flex h-[100vh] w-[100vw] overflow-hidden'
            >
              <AppSideNav />
              {children}
            </main>
            <CommandMenu />
            <Toaster />
          </AppContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
