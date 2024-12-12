import { Dispatch, MutableRefObject, PropsWithChildren, SetStateAction, createContext, useContext, useRef, useState } from 'react';

type CloseButtonTypes = 'save' | 'close';;
interface FormCloseContextValues {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  closeButton: MutableRefObject<CloseButtonTypes>;
}

const FormCloseContext = createContext<FormCloseContextValues | null>(null);

export function useFormClose() {
  const context = useContext(FormCloseContext);
  if (!context) {
    throw new Error('useFormClose must be used within FormContainerProvider component');
  }
  return context;
}

export function FormContainerProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButton = useRef('save' as CloseButtonTypes);
  return (
    <FormCloseContext.Provider value={ {
      isOpen, setIsOpen,
      closeButton,
    } }>
      { children }
    </FormCloseContext.Provider>
  );
}
