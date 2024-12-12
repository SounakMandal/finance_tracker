import { PropsWithChildren } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { Sheet } from '@/components/ui/sheet';
import { useFormClose } from './form-context';

interface FormContainerProps<T extends FieldValues> extends PropsWithChildren {
  form: UseFormReturn<T, any, undefined>;
}

export function FormContainer<T extends FieldValues>({ form, children }: FormContainerProps<T>) {
  const { isOpen, setIsOpen, closeButton } = useFormClose();
  return (
    <Sheet
      open={ isOpen }
      onOpenChange={ (newValue) => {
        // Trying to open form, always allow
        if (newValue) setIsOpen(newValue);

        // Trying to close the form here, allow only if
        // Form will not be submitted
        // Form is not dirty
        // Form is dirty but passes validation
        if (closeButton.current === 'close') {
          form.reset();
          setIsOpen(newValue);
        } else {
          if (form.formState.isDirty) {
            if (form.formState.isValid) setIsOpen(newValue);
            else setIsOpen(true);
          } else setIsOpen(newValue);
        }
      } }>
      { children }
    </Sheet>
  );
}
