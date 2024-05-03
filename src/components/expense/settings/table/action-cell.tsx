import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import { Row } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { AddExpenseType } from '../form/add-type';
import { ExpenseTypeFormData } from '../form/schema';
import { DropdownContainerProvider } from '@/components/wrapper/dropdown/dropdown-context';
import { DropdownContainer } from '@/components/wrapper/dropdown/dropdown-container';
import { DropdownTrigger } from '@/components/wrapper/dropdown/trigger';

interface ActionCellProps {
  row: Row<ExpenseTypeFormData>;
}

export function ActionCell({ row }: ActionCellProps) {
  const rowData = row.original;
  const defaultFormValues: Partial<ExpenseTypeFormData> = {
    name: rowData.name,
    category: rowData.category.toLowerCase(),
    aggregateType: rowData.aggregateType.toLowerCase()
  };

  return (
    <AddExpenseType
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
                <Button variant="ghost">Delete</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownContainer>
        </DropdownContainerProvider>
      }
      description={
        <SheetHeader>
          <SheetTitle>Modify Expense Type</SheetTitle>
          <SheetDescription>
            Modify details of your expense type
          </SheetDescription>
        </SheetHeader>
      }
    />
  );
}
