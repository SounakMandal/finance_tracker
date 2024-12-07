import { randomBytes } from 'crypto';
import { Updater, useMutation, useQueryClient } from "@tanstack/react-query";
import { insertUserExpense, updateUserExpense } from '@/actions/expense';
import { TransactionFormData } from '@/components/expense/transactions/form/schema';
import { ExpensesResponse } from '@/interface/expense';
import { toast } from '@/hooks/use-toast';


export const useUpsertUserExpense = () => {
  const queryClient = useQueryClient();
  const invalidationQueryKey = ["getUserExpense"];
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
      await queryClient.cancelQueries({ queryKey: invalidationQueryKey });
      const previousExpenses = queryClient.getQueryData<ExpensesResponse>(invalidationQueryKey);
      type Cache = typeof previousExpenses;
      const cacheUpdaterForInsert: Updater<Cache, Cache> = (old: Cache) => {
        const temporaryTransaction = { _id: temporaryTransactionId, user_id: '66404779c1087c5b05b5970b', ...transaction };
        return old
          ? { expense: [temporaryTransaction, ...old.expense] }
          : { expense: [temporaryTransaction] };
      };
      const cacheUpdateForUpdate: Updater<Cache, Cache> = (old: Cache) => {
        const updatedExpenses = old?.expense.map((expense) =>
          expense._id === transactionId
            ? { ...expense, ...transaction }
            : expense
        );
        return { expense: updatedExpenses ?? [] };
      };
      queryClient.setQueryData<ExpensesResponse>(invalidationQueryKey, transactionId ? cacheUpdateForUpdate : cacheUpdaterForInsert);
      return { previousExpenses };
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData<ExpensesResponse>(invalidationQueryKey, context?.previousExpenses);
      toast({
        title: "Failure",
        variant: "destructive",
        description: "Failed to update expense"
      });
    },
    onSuccess: (result, variables) => {
      const { transactionId } = variables;
      queryClient.setQueryData<ExpensesResponse>(
        invalidationQueryKey,
        (old: ExpensesResponse | undefined) => {
          const updatedExpenses = old?.expense.map((expense) =>
            expense._id === temporaryTransactionId && !transactionId
              ? { ...expense, _id: result as string }
              : expense
          );
          return { expense: updatedExpenses ?? [] };
        }
      );
      queryClient.invalidateQueries({ queryKey: invalidationQueryKey });
      toast({
        title: "Success",
        description: "Expense updated successfully"
      });
    },
  });
};
