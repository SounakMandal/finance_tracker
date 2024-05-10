import { ExpenseCategory, User } from '@/interface/user';
import { ObjectId } from 'mongodb';
import { client } from './connect';


export async function getUserExpenseCategories(): Promise<ExpenseCategory> {
  const userId = '663e9148f989cd29bfbbd7da';
  const document = await client
    .db("finance")
    .collection("user")
    .findOne<User>({ _id: new ObjectId(userId) });
  if (document === null) throw Error("User was not found");
  return document.expense_types;
}
