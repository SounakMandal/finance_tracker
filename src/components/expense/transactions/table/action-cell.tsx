import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { DropdownTrigger, DropdownContainer, DropdownContainerProvider } from '@/components/wrapper/dropdown';
import { ExpenseForm } from '../form/expense-form';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { TransactionFormData } from '../form/schema';
import { Pencil, Trash2 } from 'lucide-react';
import { Expense } from '@/interface/expense';

interface ActionCellProps {
  row: Row<Expense>;
}

export function ActionCell({ row }: ActionCellProps) {
  const expense = row.original;
  const defaultFormValues: Partial<TransactionFormData> = {
    type: expense.type,
    amount: expense.amount,
    date: expense.date,
    description: expense.description,
    tags: expense.tags
  };

  return (
    <ExpenseForm
      transactionId={ row.id }
      defaultValues={ defaultFormValues }
      trigger={
        <DropdownContainerProvider>
          <DropdownContainer>
            <DropdownTrigger />
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm"><Pencil />Modify</Button>
                </SheetTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost" size="sm"><Trash2 />Delete</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownContainer>
        </DropdownContainerProvider>
      }
      description={
        <SheetHeader>
          <SheetTitle>Modify Expense Details</SheetTitle>
          <SheetDescription>Modify details of your expense</SheetDescription>
        </SheetHeader>
      } />
  );
}