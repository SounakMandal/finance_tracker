'use client';

import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Each } from '@/components/utils/map';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <MixerHorizontalIcon className="mr-2 h-4 w-4" />
          View Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[150px]">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Each
          data={ table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide()
            ) }
          mapper={ (column) => {
            return (
              <DropdownMenuCheckboxItem
                key={ column.id }
                className="capitalize"
                checked={ column.getIsVisible() }
                onCheckedChange={ (value) => column.toggleVisibility(!!value) }
              >
                { column.id }
              </DropdownMenuCheckboxItem>
            );
          } }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
