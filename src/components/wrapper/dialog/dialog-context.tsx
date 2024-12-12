import { Dispatch, PropsWithChildren, ReactNode, SetStateAction, createContext, useContext, useState } from 'react';

interface DialogContextValues<T> {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  trigger: ReactNode;
  close: ReactNode;
}

const DialogContext = createContext<DialogContextValues<any> | null>(null);

export function useDialog<T>(): DialogContextValues<T> {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within DialogContainerProvider');
  }
  return context;
}

type DialogProviderProps<T> = Omit<DialogContextValues<T>, 'step' | 'setStep' | 'data' | 'setData'>;

export function DialogContainerProvider<T>({ trigger, close, children }: PropsWithChildren<DialogProviderProps<T>>) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<T | null>(null);
  return (
    <DialogContext.Provider value={ { step, setStep, data, setData, trigger, close } }>
      { children }
    </DialogContext.Provider>
  );
}
