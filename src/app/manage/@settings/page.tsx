import { ExpenseTypeForm } from '@/components/expense/settings/form/expense-type-form';
import { ExpenseTypeTable } from '@/components/expense/settings/table/expense-table';
import { Button } from '@/components/ui/button';
import { SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { getExpenseTableData } from '@/actions/user';

export default async function SettingsManagement() {
  const data = await getExpenseTableData();
  return (
    <div>
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
      <ExpenseTypeTable data={ data } />
    </div>
  );
}
