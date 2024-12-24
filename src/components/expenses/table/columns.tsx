import { type ColumnDef, type RowData } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/wrapper/table';
import { type Expense } from '@/interface/expense';
import { ActionCell } from './action-cell';
import { TagsCell } from './tags-cell';
import { User } from '@/interface/user';
import { convertToTitleCase } from '@/utils/case';

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
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Transaction Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue('date'));
      return date.toLocaleDateString(navigator.language, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    },
    filterFn: (row, _columnId, filterValue: [Date, Date]) => {
      const date = new Date(row.getValue('date'));
      return date >= filterValue[0] && date <= filterValue[1];
    }
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Expense Type" />,
    cell: ({ row }) => convertToTitleCase(row.getValue('type')),
    filterFn: 'equals'
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Amount" />,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
      }).format(amount);
      return <div className="text-left font-medium">{ formatted }</div>;
    },
    filterFn: 'inNumberRange',
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Description" />,
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Attached tags" />,
    cell: ({ row }) => <TagsCell row={ row } />,
    filterFn: (row, _columnId, filterValue) => {
      const tags = row.getValue<User['tags']>('tags');
      return tags.some(tag => tag.toLowerCase().includes(filterValue.toLowerCase()));
    }
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell row={ row } />,
  },
];
