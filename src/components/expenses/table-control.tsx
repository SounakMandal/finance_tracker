import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ExpenseForm } from '@/components/expenses/form/expense-form';
import { UploadDialog } from '@/components/expenses/upload/upload-dialog';
import { DialogContainerProvider } from '@/components/wrapper/dialog/dialog-context';

export function TableControl() {
  return (
    <div className="flex items-center justify-between py-4">
      {/* <Input
          placeholder="Filter emails..."
          value={ (table.getColumn("email")?.getFilterValue() as string) ?? "" }
          onChange={ handleFilterChange }
          className="max-w-sm"
        /> */}
      <div className='flex gap-1'>
        {/* <DataTableViewOptions table={ table } /> */ }
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
    </div>
  );
}
