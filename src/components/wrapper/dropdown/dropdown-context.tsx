import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useState } from 'react';

interface DropdownContextValues {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DropdownContext = createContext<DropdownContextValues | null>(null);

export function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('useDropdown must be used within DropdownContainerProvider');
  }
  return context;
}

export function DropdownContainerProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DropdownContext.Provider value={ { isOpen, setIsOpen } }>
      { children }
    </DropdownContext.Provider>
  );
}
