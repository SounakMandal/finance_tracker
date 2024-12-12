import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/wrapper/table';
import { ActionCell } from './action-cell';

export type ExpenseType = {
  name: string;
  category: string;
  aggregateType: string;
};

export const columns: ColumnDef<ExpenseType>[] = [
  {
    accessorKey: 'category',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Expense Category" />,
  },
  {
    accessorKey: 'aggregateType',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Aggregate Type" />,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Expense Type" />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell row={ row } />,
  },
];
