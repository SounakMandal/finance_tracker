import { Form } from '@/components/ui/form';
import { PropsWithChildren } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

interface FormProps<T extends FieldValues> extends PropsWithChildren {
  form: UseFormReturn<T, any, undefined>;
  onSubmit: (data: T) => void;
  className: string;
}

export function FormWrapper<T extends FieldValues>({ form, onSubmit, className, children }: FormProps<T>) {
  return (
    <Form { ...form }>
      <form onSubmit={ form.handleSubmit(onSubmit) } className={ className }>
        { children }
      </form>
    </Form >
  );
}
