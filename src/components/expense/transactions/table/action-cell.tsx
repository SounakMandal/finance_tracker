import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { Row } from '@tanstack/react-table';
import { Expense } from './columns';
import { DropdownTrigger } from '@/components/wrapper/dropdown/trigger';
import { AddExpense } from '../form/add-expense';
import { DropdownContainerProvider } from '@/components/wrapper/dropdown/dropdown-context';
import { DropdownContainer } from '@/components/wrapper/dropdown/dropdown-container';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { TransactionFormData } from '../form/schema';

interface ActionCellProps {
  row: Row<Expense>;
}

export function ActionCell({ row }: ActionCellProps) {
  const expense = row.original;
  const defaultFormValues: Partial<TransactionFormData> = {
    type: expense.type,
    amount: expense.amount,
    transaction_date: expense.date
  };

  return (
    <AddExpense
      defaultValues={ defaultFormValues }
      trigger={
        <DropdownContainerProvider>
          <DropdownContainer>
            <DropdownTrigger />

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>
                <SheetTrigger asChild>
                  <Button variant="ghost">Modify</Button>
                </SheetTrigger>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Button variant="ghost">Details</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownContainer>
        </DropdownContainerProvider>
      }
      description={
        <SheetHeader>
          <SheetTitle>Modify Expense Details</SheetTitle>
          <SheetDescription>
            Modify details of your expense
          </SheetDescription>
        </SheetHeader>
      } />
  );
}
