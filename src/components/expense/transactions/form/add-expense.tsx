"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { SheetContent } from "@/components/ui/sheet";
import { FormSchema, TransactionFormData } from './schema';
import { ExpenseTypeFormField } from './expense-type';
import { TransactionAmountFormField } from './amount';
import { TransactionDateFormField } from './transaction-date';
import { FormProvider } from '@/components/wrapper/form/form';
import { FormContainer } from '@/components/wrapper/form/form-container';
import { FormClose } from '@/components/wrapper/form/form-close';
import { FormContainerProvider } from '@/components/wrapper/form/form-context';
import { insertUserExpense } from '@/actions/expense';
import { TransactionDescriptionFormField } from './description';
import { TagsFormField } from './tags';


interface ExpenseProps {
  trigger: JSX.Element;
  description: JSX.Element;
  defaultValues: Partial<TransactionFormData>;
}

export function AddExpense({ defaultValues, trigger, description }: ExpenseProps) {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues
  });

  async function onSubmit(data: TransactionFormData) {
    const displayData = JSON.stringify(data, null, 2);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{ displayData }</code>
        </pre>
      ),
    });
    const id = await insertUserExpense(data);
    toast({
      title: "Record inserted successfully",
      description: id
    });
  }

  return (
    <FormContainerProvider>
      <FormContainer form={ form } >
        { trigger }

        <SheetContent>
          { description }

          <div className="grid gap-4 py-4">
            <FormProvider form={ form } onSubmit={ onSubmit } className="w-full space-y-6">
              <ExpenseTypeFormField />
              <TransactionAmountFormField />
              <TransactionDateFormField />
              <TransactionDescriptionFormField />
              <FormClose />
            </FormProvider>
          </div>
        </SheetContent>
      </FormContainer >
    </FormContainerProvider>
  );
};
