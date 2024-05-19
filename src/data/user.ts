import { ExpenseType, User } from '@/interface/user';
import { ObjectId } from 'mongodb';
import { client } from './connect';
import { convertToTitleCase } from '@/utils/case';
import document from "./example.json";

const userId = '66404779c1087c5b05b5970b';

export async function getUserExpenseCategories(): Promise<ExpenseType> {
  try {
    const document = await client
      .db("finance")
      .collection("user")
      .findOne<User>({ _id: new ObjectId(userId) });
    if (document === null) throw Error("User was not found");
    return document.expense_types;
  } catch (error) {
    console.log("Unable to connect to client. Falling back to standards");
    return document.expense_types as ExpenseType;
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
  const result = await client
    .db("finance")
    .collection("user")
    .updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateDetails }
    );
  if (result.modifiedCount === 0) throw Error("Invalid query");
}
