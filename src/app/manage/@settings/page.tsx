import { AddExpenseType } from '@/components/expense/settings/form/add-type';
import { ExpenseTypeTable } from '@/components/expense/settings/table/expense-table';
import { Button } from '@/components/ui/button';
import { SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getExpenseTableData } from '@/data/user';

export default async function SettingsManagement() {
  const data = await getExpenseTableData();
  return (
    <div>
      <ExpenseTypeTable data={ data } />
      <AddExpenseType
        defaultValues={ {} }
        trigger={
          <SheetTrigger asChild>
            <Button variant="outline">Add a New Expense Type</Button>
          </SheetTrigger>
        }
        description={
          <SheetHeader>
            <SheetTitle>Add New Expense Type</SheetTitle>
            <SheetDescription>
              Add details of your expense type
            </SheetDescription>
          </SheetHeader>
        }
      />
    </div>
  );
}
