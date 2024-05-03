import { ObjectId } from 'mongodb';

interface ExpenseTypeDetails {
  category: string,
  aggregateType: "individual" | "aggregate",
}

export interface ExpenseType {
  [key: string]: ExpenseTypeDetails;
}

export interface User {
  _id: ObjectId;
  expense_types: ExpenseType;
}
