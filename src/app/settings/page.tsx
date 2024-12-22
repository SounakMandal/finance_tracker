'use client';

import { ExpenseTypeForm } from '@/components/settings/form/expense-type-form';
import { ExpenseTypeTable } from '@/components/settings/table/expense-table';
import { Button } from '@/components/ui/button';
import { SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { useUserQuery } from '@/hooks/useUserQuery';
import { convertToTitleCase } from '@/utils/case';

export default function SettingsManagement() {
  const { data } = useUserQuery(
      (expenseTypes) => Object.entries(expenseTypes).map(([category, type]) => {
        return {
          name: convertToTitleCase(category),
          category: convertToTitleCase(type.category),
          aggregateType: convertToTitleCase(type.aggregateType),
        };
      })
  );
  return (
    <>
      <ExpenseTypeForm
        defaultValues={ {} }
        trigger={
          <SheetTrigger asChild>
            <Button variant="outline">Add Expense Type</Button>
          </SheetTrigger>
        }
        description={
          <SheetHeader>
            <SheetTitle>Add New Expense Type</SheetTitle>
            <SheetDescription>Add details of your expense type</SheetDescription>
          </SheetHeader>
        }
      />
      <ExpenseTypeTable data={ data ?? [] } />
    </>
  );
}
