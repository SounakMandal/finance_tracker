"use client";

import { JSX } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SheetContent } from "@/components/ui/sheet";
import { FormSchema, TransactionFormData } from './schema';
import { ExpenseTypeFormField } from './expense-type';
import { TransactionAmountFormField } from './amount';
import { TransactionDateFormField } from './transaction-date';
import { FormProvider, FormContainer, FormContainerProvider, FormClose } from '@/components/wrapper/form';
import { TransactionDescriptionFormField } from './description';
import { TagsFormField } from './tags';
import { useUpsertUserExpense } from '@/hooks/useUpsertUserExpense';

interface ExpenseProps {
  trigger: JSX.Element;
  transactionId?: string;
  description: JSX.Element;
  defaultValues: Partial<TransactionFormData>;
}

export function ExpenseForm(props: ExpenseProps) {
  const { transactionId, defaultValues, trigger, description } = props;
  const form = useForm<TransactionFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues
  });
  const { mutate } = useUpsertUserExpense();

  async function onSubmit(data: TransactionFormData) {
    mutate({ transactionId, transaction: data });
  }

  return (
    <FormContainerProvider>
      <FormContainer form={ form }>
        { trigger }
        <SheetContent>
          { description }
          <FormProvider form={ form } onSubmit={ onSubmit } className="w-full space-y-6">
            <div className='grid gap-4 pt-4'>
              <ExpenseTypeFormField />
              <TransactionAmountFormField />
              <TransactionDateFormField />
              <TransactionDescriptionFormField />
              <TagsFormField />
            </div>
            <FormClose />
          </FormProvider>
        </SheetContent>
      </FormContainer>
    </FormContainerProvider>
  );
};