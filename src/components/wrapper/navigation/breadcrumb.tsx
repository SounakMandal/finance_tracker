'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarItem } from '@/interface/navigation';

interface HeaderBreadcrumbProps {
  items: Omit<SidebarItem, 'icon'>[];
}

export function HeaderBreadcrumb({ items }: Readonly<HeaderBreadcrumbProps>) {
  const currentRoute = usePathname();
  const breadcrumbItems = items
      .flatMap((item) => [item, ...(item.items || [])])
      .filter((item) => currentRoute.includes(item.url))
      .map((item) => {
        if (currentRoute === item.url) {
          return (
            <BreadcrumbItem key={ item.title }>
              <BreadcrumbPage>{ item.title }</BreadcrumbPage>
            </BreadcrumbItem>
          );
        }
        return (
          <React.Fragment key={ item.title }>
            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink href={ item.url }>{ item.title }</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="hidden md:block" />
          </React.Fragment>
        );
      });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        { breadcrumbItems }
      </BreadcrumbList>
    </Breadcrumb>
  );
}
