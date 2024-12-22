import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from '@/components/ui/sidebar';
import { SidebarItem } from '@/interface/navigation';
import { Each } from '@/components/utils/map';
import { SidebarSubItem } from './sidebar-item';

export function SidebarGroupItem({ item }: { item: SidebarItem; }) {
  return (
    <Collapsible asChild>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={ item.url }>
            <item.icon />
            <span>{ item.title }</span>
          </Link>
        </SidebarMenuButton>
        { item.items?.length ? (
          <>
            <CollapsibleTrigger asChild>
              <SidebarMenuAction className="data-[state=open]:rotate-90">
                <ChevronRight />
                <span className="sr-only">Toggle</span>
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <Each
                  data={ item.items }
                  mapper={ (subItem) => (<SidebarSubItem key={ subItem.title } subItem={ subItem } />) }
                />
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        ) : null }
      </SidebarMenuItem>
    </Collapsible>
  );
}
