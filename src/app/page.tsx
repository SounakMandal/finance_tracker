import CategoryExpense from '@/components/expense/category';
import DailyExpense from '@/components/expense/daily';
import { Transactions } from '@/components/expense/transactions/transactions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserExpenseCategories } from '@/data/user';

export default async function Home() {
  const expenseTypes = await getUserExpenseCategories();

  return (
    <main className="flex flex-1 flex-col gap-4 p-8 lg:gap-6">
      <Tabs defaultValue="expenses" className="w-full">
        <TabsList>
          <TabsTrigger value="expenses">Expenses</TabsTrigger>
          <TabsTrigger value="investments">Investments</TabsTrigger>
          <TabsTrigger value="planning">Planning</TabsTrigger>
        </TabsList>

        <TabsContent value="expenses">
          <div className='flex flex-row w-full gap-4'>
            <DailyExpense className='flex-grow' />
            <CategoryExpense expense={ expenseTypes } className='flex-grow' />
          </div>
          <Transactions />
        </TabsContent>

        <TabsContent value="investments">Change your investments here.</TabsContent>
        <TabsContent value="planning">Change your planning here.</TabsContent>
      </Tabs>
    </main>
  );
}
