import { LucideProps } from 'lucide-react';
import { ForwardRefExoticComponent, RefAttributes } from 'react';

export type SidebarSubItem = Omit<SidebarItem, 'items'>;

export interface SidebarItem {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
  items?: SidebarSubItem[];
}

export interface NavigationItem {
  title: string;
  href: string;
  description: string;
}
