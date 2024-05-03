"use server";

import { ExpenseType, User } from '@/interface/user';
import { ObjectId } from 'mongodb';
import { database, user_id } from '../data/connect';
import { convertToTitleCase } from '@/utils/case';
import document from "../data/user_example.json";

export async function getUserExpenseCategories(): Promise<Record<string, ExpenseType>> {
  try {
    const document = await database
      .collection("user")
      .findOne<User>({ _id: new ObjectId(user_id) });
    if (document === null) throw Error("User was not found");
    return document.expense_types;
  } catch (error) {
    console.log("Unable to connect to client. Falling back to standards");
    return document.expense_types as Record<string, ExpenseType>;
  }
}

export async function getExpenseTableData() {
  const expenseTypes = await getUserExpenseCategories();
  return Object.entries(expenseTypes)
    .map(([category, type]) => {
      return {
        name: convertToTitleCase(category),
        category: convertToTitleCase(type.category),
        aggregateType: convertToTitleCase(type.aggregateType)
      };
    });
}

export async function getExpenseAmountData() {
  const expenseTypes = await getUserExpenseCategories();
  return Object.entries(expenseTypes)
    .map(([category, type]) => {
      return {
        name: category,
        total: Math.floor(Math.random() * 5000) + 1000,
      };
    });
}

export async function updateUserDetails(updateDetails: object) {
  const result = await database
    .collection("user")
    .updateOne(
      { _id: new ObjectId(user_id) },
      { $set: updateDetails }
    );
  if (result.modifiedCount === 0) throw Error("Invalid query");
}
