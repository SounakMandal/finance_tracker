import React from 'react';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { type Table as TableType } from '@tanstack/table-core';
import { Button } from '@/components/ui/button';
import { ExpenseForm } from '@/components/expenses/form/expense-form';
import { UploadDialog } from '@/components/expenses/upload/upload-dialog';
import { DialogContainerProvider } from '@/components/wrapper/dialog/dialog-context';
import { DataTableViewOptions } from '../../wrapper/table';
import { TableFilters } from './table-filters';

export function TableControl<TData>({ table }: { table: TableType<TData>; }) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className='flex gap-1'>
        <TableFilters table={ table } />
        <DataTableViewOptions table={ table } />
      </div>
      <div className='flex gap-1'>
        <ExpenseForm
          defaultValues={ {} }
          trigger={
            <SheetTrigger asChild>
              <Button variant="outline">Add Expense</Button>
            </SheetTrigger>
          }
          description={
            <SheetHeader>
              <SheetTitle>Add Expense</SheetTitle>
              <SheetDescription>Add details of your expense</SheetDescription>
            </SheetHeader>
          }
        />
        <DialogContainerProvider
          trigger={ <Button variant="outline">Upload Expenses</Button> }
          close={ <Button variant="outline">Import</Button> }
        >
          <UploadDialog />
        </DialogContainerProvider>
      </div>
    </div >
  );
}