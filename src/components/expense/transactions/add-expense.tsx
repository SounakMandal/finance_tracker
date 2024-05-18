"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { FormSchema, TransactionFormData } from './schema';
import { ExpenseTypeFormField } from './expense-type';
import { TransactionAmountFormField } from './amount';
import { TransactionDateFormField } from './transaction-date';
import { FormWrapper } from '@/components/wrapper/form/form';


export function AddExpense() {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(FormSchema),
  });
  const clickedButton = useRef('');
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  }

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
        if (clickedButton.current === "close") {
          form.reset();
          setIsOpen(newValue);
        } else {
          if (form.formState.isDirty) {
            if (form.formState.isValid) setIsOpen(newValue);
            else setIsOpen(true);
          } else setIsOpen(newValue);
        }
      } }>
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
          <FormWrapper form={ form } onSubmit={ onSubmit } className="w-full space-y-6">
            <ExpenseTypeFormField />
            <TransactionAmountFormField />
            <TransactionDateFormField />
            <SheetFooter>
              { form.formState.isDirty &&
                <SheetClose
                  type='submit'
                  onClick={ () => clickedButton.current = 'save' }
                >
                  Save changes
                </SheetClose>
              }
              <SheetClose onClick={ () => clickedButton.current = 'close' } >Close</SheetClose>
            </SheetFooter>
          </FormWrapper>
        </div>
      </SheetContent>
    </Sheet >
  );
};
