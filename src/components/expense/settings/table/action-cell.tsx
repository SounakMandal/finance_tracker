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

interface ActionCellProps {
  row: Row<ExpenseTypeFormData>;
}

export function ActionCell({ row }: ActionCellProps) {
  const rowData = row.original;
  const defaultFormValues = {
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
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

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
