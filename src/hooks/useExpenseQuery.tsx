import { useQuery } from '@tanstack/react-query';
import { getUserExpense } from '@/actions/expense';
import { ExpensesResponse } from '@/interface/expense';
import { expenseKeys } from '@/data/key';

export const useExpenseQuery = () => {
  return useQuery<ExpensesResponse, Error>({
    queryKey: expenseKeys.query,
    queryFn: getUserExpense,
    initialData: { expense: [] },
  });
};
