import { Updater, useMutation, useQueryClient } from '@tanstack/react-query';
import { randomBytes } from 'crypto';
import { insertUserExpense, updateUserExpense } from '@/actions/expense';
import { TransactionFormData } from '@/components/expenses/form/schema';
import { ExpensesResponse } from '@/interface/expense';
import { toast } from '@/hooks/use-toast';
import { expenseKeys } from '@/data/key';

export const useExpenseMutation = () => {
  const queryClient = useQueryClient();
  const temporaryTransactionId = randomBytes(20).toString();
  const upsertUserExpense = async (data: { transactionId: string | undefined; transaction: TransactionFormData; }) => {
    const { transactionId, transaction } = data;
    if (transactionId) {
      return await updateUserExpense(transactionId, transaction);
    } else {
      return await insertUserExpense(transaction);
    }
  };

  return useMutation({
    mutationFn: upsertUserExpense,
    onMutate: async ({ transactionId, transaction }) => {
      await queryClient.cancelQueries({ queryKey: expenseKeys.query });
      const previousExpenses = queryClient.getQueryData<ExpensesResponse>(expenseKeys.query);
      type Cache = typeof previousExpenses;
      const cacheUpdaterForInsert: Updater<Cache, Cache> = (old: Cache) => {
        const temporaryTransaction = { _id: temporaryTransactionId, user_id: '66404779c1087c5b05b5970b', ...transaction };
        return old ?
          { expense: [temporaryTransaction, ...old.expense] } :
          { expense: [temporaryTransaction] };
      };
      const cacheUpdateForUpdate: Updater<Cache, Cache> = (old: Cache) => {
        const updatedExpenses = old?.expense.map((expense) =>
          expense._id === transactionId ?
            { ...expense, ...transaction } :
            expense
        );
        return { expense: updatedExpenses ?? [] };
      };
      queryClient.setQueryData<ExpensesResponse>(expenseKeys.query, transactionId ? cacheUpdateForUpdate : cacheUpdaterForInsert);
      return { previousExpenses };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData<ExpensesResponse>(expenseKeys.query, context?.previousExpenses);
      toast({
        title: 'Failure',
        variant: 'destructive',
        description: 'Failed to update expense',
      });
    },
    onSuccess: (result, variables) => {
      const { transactionId } = variables;
      queryClient.setQueryData<ExpensesResponse>(
        expenseKeys.query,
        (old: ExpensesResponse | undefined) => {
          const updatedExpenses = old?.expense.map((expense) =>
            expense._id === temporaryTransactionId && !transactionId ?
              { ...expense, _id: result as string } :
              expense
          );
          return { expense: updatedExpenses ?? [] };
        }
      );
      queryClient.invalidateQueries({ queryKey: expenseKeys.query });
      toast({
        title: 'Success',
        description: 'Expense updated successfully',
      });
    },
  });
};
