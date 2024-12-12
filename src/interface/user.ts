import { ObjectId } from 'mongodb';

export interface ExpenseType {
  category: "needs" | "wants",
  aggregateType: "individual" | "aggregate",
}

export interface User {
  _id: ObjectId;
  expense_types: Record<string, ExpenseType>;
}
