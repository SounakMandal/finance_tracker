import { Form } from '@/components/ui/form';
import { PropsWithChildren } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';
import { useFormClose } from './form-context';

interface FormProps<T extends FieldValues> extends PropsWithChildren {
  form: UseFormReturn<T, any, undefined>;
  onSubmit: (data: T) => void;
  className: string;
}

export function FormProvider<T extends FieldValues>({ form, onSubmit, className, children }: FormProps<T>) {
  const { setIsOpen } = useFormClose();
  function onValid(data: T) {
    setIsOpen(false);
    onSubmit(data);
  }

  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onValid) } className={ className }>
        { children }
      </form>
    </Form >
  );
}
