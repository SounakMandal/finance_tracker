import Link from 'next/link';
import {
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { type SidebarSubItem } from '@/interface/navigation';

export function SidebarSubItem({ subItem }: { subItem: SidebarSubItem; }) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link href={ subItem.url }>
          <subItem.icon />
          <span>{ subItem.title }</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
