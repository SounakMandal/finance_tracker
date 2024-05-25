"use server";

import { Expense } from '@/components/expense/transactions/table/columns';
import { database, user_id } from '../data/connect';
import { TransactionFormData } from '@/components/expense/transactions/form/schema';

export async function getUserExpense(): Promise<{ expense: Expense[]; }> {
  try {
    const documents = await database
      .collection("expense")
      .find<Expense>({ user_id })
      .toArray();
    if (documents === null) throw Error("Expense data was not found");
    return {
      expense: documents.map(
        (expense) => {
          return {
            ...expense,
            _id: expense._id.toString(),
            date: new Date(expense.date)
          };
        }
      )
    };
  } catch (error) {
    return { expense: [] };
  }
}

export async function insertUserExpense(transaction: TransactionFormData) {
  const result = await database
    .collection("expense")
    .insertOne(transaction);
  return result.insertedId.toString();
}
