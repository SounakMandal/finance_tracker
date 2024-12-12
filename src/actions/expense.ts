"use server";

import { database, user_id } from '../data/connect';
import { TransactionFormData } from '@/components/expenses/form/schema';
import { Expense, ExpensesResponse } from '@/interface/expense';
import { ObjectId } from 'mongodb';

export async function getUserExpense(): Promise<ExpensesResponse> {
  const documents = await database
    .collection("expense")
    .find<Expense>({ user_id })
    .toArray();

  if (documents === null)
    throw Error("Expense data was not found");

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
}

export async function insertUserExpense(transaction: TransactionFormData) {
  const result = await database
    .collection("expense")
    .insertOne({ ...transaction, user_id });
  return result.insertedId.toString();
}

export async function updateUserExpense(
  transactionId: string,
  transaction: Partial<TransactionFormData>
) {
  const result = await database
    .collection("expense")
    .updateOne(
      { _id: new ObjectId(transactionId) },
      { $set: transaction }
    );

  if (result.matchedCount === 0) {
    throw new Error(`No document found with id: ${ transactionId }`);
  }

  return result.modifiedCount > 0;
}
