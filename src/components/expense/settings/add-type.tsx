"use client";

import { Button } from '@/components/ui/button';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { updateUserDetails } from '@/data/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { FormProvider } from '@/components/wrapper/form/form';
import { ExpenseTypeFormField } from './expense-type';
import { ExpenseCategoryFormField } from './expense-category';
import { AggregateTypeFormField } from './aggregate-type';
import { FormContainer } from '@/components/wrapper/form/form-container';
import { FormContainerProvider } from '@/components/wrapper/form/form-context';
import { FormClose } from '@/components/wrapper/form/form-close';
import { ExpenseTypeFormData, FormSchema } from './schema';
import { toast } from '@/components/ui/use-toast';

export function AddExpenseType() {
  const form = useForm<ExpenseTypeFormData>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: ExpenseTypeFormData) {
    const displayData = JSON.stringify(data, null, 2);
    toast({
      title: "You submitted the following values:",
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
        <SheetTrigger asChild>
          <Button variant="outline">
            Add a New Expense Type
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add New Expense Type</SheetTitle>
            <SheetDescription>
              Add details of your expense type
            </SheetDescription>
          </SheetHeader>

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
