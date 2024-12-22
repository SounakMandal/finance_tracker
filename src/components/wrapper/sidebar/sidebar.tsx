import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { Each } from '@/components/utils/map';
import { SidebarItem } from '@/interface/navigation';
import { SidebarGroupItem } from './sidebar-group';

interface SidebarProps {
  label: string;
  items: SidebarItem[];
}

export function AppSidebar({
  label,
  items,
}: SidebarProps) {
  return (
    <Sidebar collapsible='icon'>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{ label }</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Each
                data={ items }
                mapper={ (item) => (<SidebarGroupItem key={ item.title } item={ item } />) }
              />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
