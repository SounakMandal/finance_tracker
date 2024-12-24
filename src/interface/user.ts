export interface ExpenseType {
  category: 'needs' | 'wants',
  aggregateType: 'individual' | 'aggregate',
}

export interface User {
  _id: string;
  expense_types: Record<string, ExpenseType>;
  tags: string[];
}
