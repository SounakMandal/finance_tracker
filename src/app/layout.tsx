import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import {
  ChartCandlestick,
  ChartLine,
  Notebook,
  ReceiptText,
  Settings,
  View,
} from 'lucide-react';
import { AppSidebar } from '@/components/wrapper/sidebar/sidebar';
import { Toaster } from '@/components/ui/toaster';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { HeaderBreadcrumb } from '@/components/wrapper/navigation/breadcrumb';
import { SidebarItem, SidebarSubItem } from '@/interface/navigation';
import { HttpClient } from './client';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Finance Tracker',
  description: 'All around expense and investment tracking',
};

const removeIcons = (items: SidebarItem[]): Omit<SidebarItem, 'icon'>[] => {
  return items.map(({ icon, items, ...rest }) => ({
    ...rest,
    items: items ? removeIcons(items) as SidebarSubItem[] : undefined,
  }));
};

const items: SidebarItem[] = [
  {
    title: 'Expenses',
    url: '/expenses',
    icon: ReceiptText,
    items: [
      {
        title: 'Display',
        url: '/expenses/display',
        icon: ChartLine,
      },
      {
        title: 'Views',
        url: '/expenses/views',
        icon: View,
      },
    ],
  },
  {
    title: 'Investments',
    url: '#',
    icon: ChartCandlestick,
  },
  {
    title: 'Planning',
    url: '#',
    icon: Notebook,
  },
  {
    title: 'Settings',
    url: '/settings',
    icon: Settings,
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <HttpClient>
        <body className={ inter.className }>
          <Toaster />
          <SidebarProvider>
            <AppSidebar label={ 'Sounak Mandal' } items={ items } />
            <SidebarInset>
              <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                <div className="flex items-center gap-2 px-4">
                  <SidebarTrigger className="-ml-1" />
                  <Separator orientation="vertical" className="mr-2 h-4" />
                  <HeaderBreadcrumb items={ removeIcons(items) } />
                </div>
              </header>
              <div className='mx-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2'>
                { children }
              </div>
            </SidebarInset>
          </SidebarProvider>
        </body>
      </HttpClient>
    </html>
  );
}
