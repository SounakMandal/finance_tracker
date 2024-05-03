import { ObjectId } from 'mongodb';

export type Expense = {
  _id: string | ObjectId;
  user_id: string;
  date: Date;
  type: string;
  amount: number;
  description?: string;
  tags?: string[];
};

export interface ExpensesResponse { expense: Expense[]; }

