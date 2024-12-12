import { Row } from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { DropdownTrigger, DropdownContainer, DropdownContainerProvider } from '@/components/wrapper/dropdown';
import { ExpenseTypeForm } from '../form/expense-type-form';
import { ExpenseTypeFormData } from '../form/schema';

interface ActionCellProps {
  row: Row<ExpenseTypeFormData>;
}

export function ActionCell({ row }: ActionCellProps) {
  const rowData = row.original;
  const defaultFormValues: Partial<ExpenseTypeFormData> = {
    name: rowData.name,
    category: rowData.category.toLowerCase(),
    aggregateType: rowData.aggregateType.toLowerCase(),
  };

  return (
    <ExpenseTypeForm
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
          <SheetDescription>Modify details of your expense type</SheetDescription>
        </SheetHeader>
      }
    />
  );
}
