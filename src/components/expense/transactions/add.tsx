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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";
import { FormSchema, TransactionFormData } from './schema';
import { ExpenseTypeFormField } from './expense-type';
import { AmountFormField } from './amount';
import { TransactionDateFormField } from './transaction-date';


export function AddExpense() {
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: TransactionFormData) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{ JSON.stringify(data, null, 2) }</code>
        </pre>
      ),
    });
  }

  return (
    <Sheet>
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
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="w-full space-y-6">
              <ExpenseTypeFormField form={ form } />
              <AmountFormField form={ form } />
              <TransactionDateFormField form={ form } />
              <SheetFooter>
                <SheetClose asChild>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet >
  );
};
