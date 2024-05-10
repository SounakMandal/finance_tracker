"use client";

import React from 'react';
import { ResponsiveContainer, XAxis, YAxis, Bar, BarChart } from 'recharts';

interface Graph {
  data: any[];
}

export default function Graph({ data }: Graph) {
  return (
    <ResponsiveContainer width="100%" height={ 350 }>
      <BarChart data={ data }>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={ 12 }
          tickLine={ false }
          axisLine={ false }
        />
        <YAxis
          stroke="#888888"
          fontSize={ 12 }
          tickLine={ false }
          axisLine={ false }
          tickFormatter={ (value) => `$${ value }` }
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={ [4, 4, 0, 0] }
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
