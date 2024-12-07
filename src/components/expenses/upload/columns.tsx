"use client";

import { Checkbox } from '@/components/ui/checkbox';
import { type ColumnDef, type RowData } from "@tanstack/react-table";
import { DataTableColumnHeader } from '@/components/wrapper/table';
import { TagsCell } from '../table/tags-cell';
import { type Expense } from '@/interface/expense';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExpenseType } from '../form/expense-type';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

export const columns: ColumnDef<Expense>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={ (value) => table.toggleAllPageRowsSelected(!!value) }
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={ row.getIsSelected() }
  //       onCheckedChange={ (value) => row.toggleSelected(!!value) }
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Transaction Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"));
      return date.toLocaleDateString(navigator.language, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Expense Type" />,
    cell: ({ getValue, row, column, table }) => {
      const [value, setValue] = useState(getValue<string>());
      return <Select
        value={ value }
        onValueChange={ value => setValue(value) }
      >
        <SelectTrigger>
          <SelectValue
            placeholder={ value }
            onBlur={ () => table.options.meta?.updateData(row.index, column.id, value) }
          />
        </SelectTrigger>
        <ExpenseType />
      </Select>;
    }
  },
  {
    accessorKey: "amount",
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Amount" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat(navigator.language, {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return <div className="text-left font-medium">{ formatted }</div>;
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Description" />,
    cell: ({ getValue, row, column, table }) => {
      const [value, setValue] = useState(getValue<string>());
      return <Input
        value={ value }
        placeholder={ value }
        onChange={ event => setValue(event.target.value) }
        onBlur={ () => table.options.meta?.updateData(row.index, column.id, value) }
        className='bg-transparent border-0'
      />;
    }
  },
  {
    accessorKey: "tags",
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Attached tags" />,
    cell: ({ row }) => <TagsCell row={ row } />,
  },
];
