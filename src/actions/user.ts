"use server";

import { User } from '@/interface/user';
import { ObjectId } from 'mongodb';
import { database, user_id } from '../data/connect';
import document from "../data/user_example.json";

export async function getExpenseCategories(): Promise<User["expense_types"]> {
  try {
    const document = await database
      .collection("user")
      .findOne<User>({ _id: new ObjectId(user_id) });
    if (document === null) throw Error("User was not found");
    return document.expense_types;
  } catch (error) {
    console.log("Unable to connect to client. Falling back to standards");
    return document.expense_types as User["expense_types"];
  }
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
