import { ColumnDef } from '@tanstack/react-table';
import { DataTableColumnHeader } from '@/components/wrapper/table';
import { type Expense } from '@/interface/expense';
import { ActionCell } from './action-cell';
import { TagsCell } from './tags-cell';

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
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Expense Type" />,
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
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Description" />,
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Attached tags" />,
    cell: ({ row }) => <TagsCell row={ row } />,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionCell row={ row } />,
  },
];
