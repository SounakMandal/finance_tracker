'use client';

import { JSX } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SheetContent } from '@/components/ui/sheet';
import { FormProvider, FormContainer, FormContainerProvider, FormClose } from '@/components/wrapper/form';
import { toast } from '@/hooks/use-toast';
import { ExpenseTypeFormField } from './expense-type';
import { ExpenseCategoryFormField } from './expense-category';
import { AggregateTypeFormField } from './aggregate-type';
import { ExpenseTypeFormData, FormSchema } from './schema';

interface ExpenseTypeProps {
  trigger: JSX.Element;
  description: JSX.Element;
  defaultValues: Partial<ExpenseTypeFormData>;
}

export function ExpenseTypeForm({ defaultValues, trigger, description }: ExpenseTypeProps) {
  const form = useForm<ExpenseTypeFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues,
  });

  function onSubmit(data: ExpenseTypeFormData) {
    const displayData = JSON.stringify(data, null, 2);
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{ displayData }</code>
        </pre>
      ),
    });
  }

  return (
    <FormContainerProvider>
      <FormContainer form={ form }>
        { trigger }
        <SheetContent>
          { description }
          <div className="grid gap-4 py-4">
            <FormProvider form={ form } onSubmit={ onSubmit } className="w-full space-y-6">
              <ExpenseTypeFormField />
              <ExpenseCategoryFormField />
              <AggregateTypeFormField />
              <FormClose />
            </FormProvider>
          </div>
        </SheetContent>
      </FormContainer >
    </FormContainerProvider>
  );
}
