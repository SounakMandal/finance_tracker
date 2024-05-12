import { Button } from '@/components/ui/button';
import { DataTableColumnHeader } from '@/components/wrapper/table/column-header';
import { ColumnDef } from '@tanstack/react-table';
import { Trash2 } from 'lucide-react';

export type ExpenseType = {
  category: string;
  type: string;
};

export const columns: ColumnDef<ExpenseType>[] = [
  {
    accessorKey: "category",
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Expense Category" />,
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Expense Type" />,
  },
  {
    id: "delete",
    cell: ({ row }) => {
      const rowData = row.original;
      return (
        <Button variant="secondary" onClick={ (event) => {
          console.log(rowData);
        } }>
          Delete <Trash2 />
        </Button>
      );
    }
  }
];
