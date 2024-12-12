import { PropsWithChildren } from 'react';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { useDropdown } from './dropdown-context';

export function DropdownContainer({ children }: PropsWithChildren) {
  const { isOpen, setIsOpen } = useDropdown();
  return (
    <DropdownMenu
      open={ isOpen }
      onOpenChange={ (newValue) => {
        setIsOpen(newValue);
      } }
    >
      { children }
    </DropdownMenu>
  );
}
