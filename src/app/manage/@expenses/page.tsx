import DailyExpense from '@/components/expenses/daily';
import CategoryExpense from '@/components/expenses/category';
import { getExpenseAmountData } from '@/actions/user';
import { Transactions } from '@/components/expenses/transactions';

export default async function ExpenseManagement() {
  const expense = await getExpenseAmountData();
  return (
    <>
      <div className='flex flex-row w-full gap-4'>
        <DailyExpense className='flex-grow' />
        <CategoryExpense expense={ expense } className='flex-grow' />
      </div>
      <Transactions />
    </>
  );
}
