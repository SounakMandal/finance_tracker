'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Graph from '../wrapper/graph/graph';

interface CategoryExpense {
  expense: {
    name: string,
    total: number;
  }[];
  className: string;
}

export default function CategoryExpense({ expense, className }: CategoryExpense) {
  return (
    <Card className={ className }>
      <CardHeader>
        <CardTitle>Category Expense</CardTitle>
        <CardDescription>
          Category wise breakup of all your expenses
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Graph data={ expense } />
      </CardContent>
    </Card>
  );
}
