import { AddExpenseType } from '@/components/expense/settings/add-expense-type';
import { ExpenseTypeTable } from '@/components/expense/settings/expense-table';
import { getExpenseTableData } from '@/data/user';

export default async function SettingsManagement() {
  const data = await getExpenseTableData();
  return (
    <div>
      <ExpenseTypeTable data={ data } />
      <AddExpenseType />
    </div>
  );
}
