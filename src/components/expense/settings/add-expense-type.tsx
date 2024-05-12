"use client";

import { Button } from '@/components/ui/button';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { updateUserDetails } from '@/data/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Form, useForm } from 'react-hook-form';
import { FormSchema } from '../transactions/schema';

export function AddExpenseType() {
  const form = useForm<any>({
    resolver: zodResolver(FormSchema),
  });
  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(data: any) {

  }

  return (
    <Sheet
      open={ isOpen }
      onOpenChange={ (newValue) => {
        console.log(newValue, form.formState);
        if (newValue) setIsOpen(true);
        if (form.formState.isDirty) {
          if (form.formState.isValid) setIsOpen(false);
          else setIsOpen(true);
        }
      } }>
      <SheetTrigger asChild>
        <Button variant="outline">
          Add an Expense
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add new Expense Type </SheetTitle>
          <SheetDescription>
            Add details of your expense type
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          <Form { ...form }>
            <form onSubmit={ form.handleSubmit(onSubmit) } className="w-full space-y-6">
              <SheetFooter>
                <SheetClose>
                  <Button type="submit">Save changes</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet >
  );
}
