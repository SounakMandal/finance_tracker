import { ObjectId } from 'mongodb';

interface ExpenseType {
  [key: string]: string;
}

export interface ExpenseCategory {
  needs: ExpenseType;
  wants: ExpenseType;
}

export interface User {
  _id: ObjectId;
  expense_types: ExpenseCategory;
}
