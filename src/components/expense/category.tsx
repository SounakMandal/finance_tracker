"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Graph from './graph';

interface CategoryExpense {
  className: string;
}

export default function CategoryExpense({ className }: CategoryExpense) {
  const data = [
    {
      name: "Rent",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Entertainment",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Food",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "House",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Drinks",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "EMI",
      total: Math.floor(Math.random() * 5000) + 1000,
    }
  ];


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
