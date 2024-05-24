import { Expense } from '@/components/expense/transactions/table/columns';
import { number } from 'zod';

const today = new Date().toLocaleString();
export function getUserExpense(): Expense[] {
  return [
    {
      id: "728ed52f",
      userId: "66404779c1087c5b05b5970b",
      date: today,
      expenseType: "rent",
      description: "Rent for the month of August",
      tags: ["rent"],
      amount: 18000,
    },
    {
      id: "728ed52g",
      userId: "66404779c1087c5b05b5970b",
      date: today,
      expenseType: "food",
      description: "Lunch on some day",
      amount: 200,
      tags: ["food"],
    },
    {
      id: "828ed52f",
      userId: "66404779c1087c5b05b5970b",
      date: today,
      expenseType: "lunch",
      description: "Lunch in office",
      amount: 140,
      tags: ["biryani"],
    },
    {
      id: "928ed52f",
      userId: "66404779c1087c5b05b5970b",
      date: today,
      expenseType: "travel",
      description: "Uber to home",
      amount: 350,
      tags: ["moto"],
    }
  ];
}
