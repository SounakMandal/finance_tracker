'use client';

import {
  Cell,
  ColumnDef,
  Header,
  HeaderGroup,
  Row,
  flexRender,
} from '@tanstack/react-table';
import { Table as TableType } from '@tanstack/table-core';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Each } from '@/components/utils/map';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
}

function renderTableHead<TData>(header: Header<TData, unknown>) {
  return (
    <TableHead key={ header.id } className="bg-secondary">
      { header.isPlaceholder ?
        null :
        flexRender(
          header.column.columnDef.header,
          header.getContext()
        ) }
    </TableHead>
  );
}

function renderTableHeader<TData>(headerGroup: HeaderGroup<TData>) {
  return (
    <TableRow key={ headerGroup.id }>
      <Each
        data={ headerGroup.headers }
        mapper={ renderTableHead }
      />
    </TableRow>
  );
}

function renderTableCell<TData>(cell: Cell<TData, unknown>) {
  return (
    <TableCell key={ cell.id }>
      { flexRender(cell.column.columnDef.cell, cell.getContext()) }
    </TableCell>
  );
}

function renderTableBody<TData>(row: Row<TData>) {
  return (
    <TableRow key={ row.id } data-state={ row.getIsSelected() && 'selected' }>
      <Each
        data={ row.getVisibleCells() }
        mapper={ renderTableCell }
      />
    </TableRow>
  );
}

export function DataTable<TData, TValue>({
  columns,
  table,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <Each
            data={ table.getHeaderGroups() }
            mapper={ renderTableHeader }
          />
        </TableHeader>
        <TableBody>
          { table.getRowModel().rows?.length ? (
            <Each
              data={ table.getRowModel().rows }
              mapper={ renderTableBody }
            />
          ) : (
            <TableRow>
              <TableCell colSpan={ columns.length } className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) }
        </TableBody>
      </Table>
    </div>
  );
}
