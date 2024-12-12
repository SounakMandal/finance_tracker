'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import Graph from '../wrapper/graph/graph';

interface DailyExpense {
  className?: string;
}

export default function DailyExpense({ className }: DailyExpense) {
  const data = [
    {
      name: 'Jan',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Feb',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Mar',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Apr',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'May',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jun',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Jul',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Aug',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Sep',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Oct',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Nov',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: 'Dec',
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ];

  return (
    <Card className={ className }>
      <CardHeader>
        <CardTitle>Daily Expense</CardTitle>
        <CardDescription>
          Daily breakup of all your expenses
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-2">
        <Graph data={ data } />
      </CardContent>
    </Card>
  );
}
