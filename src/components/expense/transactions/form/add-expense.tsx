"use client";

import { Button } from "@/components/ui/button";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { FormSchema, TransactionFormData } from './schema';
import { ExpenseTypeFormField } from './expense-type';
import { TransactionAmountFormField } from './amount';
import { TransactionDateFormField } from './transaction-date';
import { FormProvider } from '@/components/wrapper/form/form';
import { FormContainer } from '@/components/wrapper/form/form-container';
import { FormClose } from '@/components/wrapper/form/form-close';
import { FormContainerProvider } from '@/components/wrapper/form/form-context';


export function AddExpense() {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: TransactionFormData) {
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
      <FormContainer form={ form } >
        <SheetTrigger asChild>
          <Button variant="outline">
            Add an Expense
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Add an Expense</SheetTitle>
            <SheetDescription>
              Add details of your expense
            </SheetDescription>
          </SheetHeader>

          <div className="grid gap-4 py-4">
            <FormProvider form={ form } onSubmit={ onSubmit } className="w-full space-y-6">
              <ExpenseTypeFormField />
              <TransactionAmountFormField />
              <TransactionDateFormField />
              <FormClose />
            </FormProvider>
          </div>
        </SheetContent>
      </FormContainer >
    </FormContainerProvider>
  );
};
