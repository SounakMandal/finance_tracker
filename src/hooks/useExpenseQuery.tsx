import { getUserExpense } from '@/actions/expense';
import { ExpensesResponse } from '@/interface/expense';
import { useQuery } from "@tanstack/react-query";

export const useExpenseQuery = () => {
  return useQuery<ExpensesResponse, Error>({
    queryKey: ["getUserExpense"],
    queryFn: getUserExpense,
    initialData: { expense: [] }
  });
};
