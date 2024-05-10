"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Graph from '../wrapper/graph/graph';
import { ExpenseCategory } from '@/interface/user';

interface CategoryExpense {
  expense: ExpenseCategory;
  className: string;
}

export default function CategoryExpense({ expense, className }: CategoryExpense) {
  const needs = expense.needs;
  const wants = expense.wants;
  const data = Object.values(needs)
    .map((item) => {
      return {
        name: item,
        total: Math.floor(Math.random() * 5000) + 1000,
      };
    });

  return (
    <Card className={ className }>
      <CardHeader>
        <CardTitle>Category Expense</CardTitle>
        <CardDescription>
          Category wise breakup of all your expenses
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Graph data={ data } />
      </CardContent>
    </Card>
  );
}
