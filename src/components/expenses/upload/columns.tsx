'use client';

import { type ColumnDef, type RowData } from '@tanstack/react-table';
import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { type Expense } from '@/interface/expense';
import { DataTableColumnHeader } from '@/components/wrapper/table';
import { cn } from '@/lib/utils';
import { TagsCell } from './tags-cell';
import { ExpenseType } from '../expense-type';

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
    accessorKey: 'date',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Transaction Date" />,
    cell: ({ row }) => {
      const initialValue = new Date(row.getValue('date'));
      const [calendarOpen, setCalendarOpen] = useState(false);
      const [date, setDate] = useState<Date | undefined>(initialValue);
      return (
        <Popover open={ calendarOpen } onOpenChange={ setCalendarOpen }>
          <PopoverTrigger asChild>
            <Button variant={ 'outline' } className={ cn('pl-3 text-left font-normal', !date && 'text-muted-foreground') }>
              { date ?
                format(date, 'PPP') :
                <span>Pick a date</span>
              }
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={ date }
              onSelect={ (date) => {
                setDate(date);
                setCalendarOpen(false);
              } }
              disabled={ (date: Date) => date > new Date() || date < new Date('1900-01-01') }
            />
          </PopoverContent>
        </Popover>
      );
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Expense Type" />,
    cell: ({ getValue, row, column, table }) => {
      const [value, setValue] = useState(getValue<string>());
      return <Select
        value={ value }
        onValueChange={ (value) => setValue(value) }
      >
        <SelectTrigger>
          <SelectValue
            placeholder={ value }
            onBlur={ () => table.options.meta?.updateData(row.index, column.id, value) }
          />
        </SelectTrigger>
        <ExpenseType />
      </Select>;
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Amount" />,
    cell: ({ row, column, table }) => {
      const [editing, setIsEditing] = useState(false);
      const [value, setValue] = useState(parseFloat(row.getValue('amount')));

      const formatted = new Intl.NumberFormat(navigator.language, {
        style: 'currency',
        currency: 'INR',
      }).format(value);

      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = event.target.value.replace(/[^\d.]/g, '');
        console.log(rawValue);
        setValue(rawValue ? parseFloat(rawValue) : 0);
      };

      const handleFocus = () => {
        setIsEditing(true);
      };

      const handleBlur = () => {
        setIsEditing(false);
        table.options.meta?.updateData(row.index, column.id, value);
      };

      return <Input
        value={ editing ? value.toString() : formatted }
        onChange={ handleInputChange }
        onBlur={ handleBlur }
        onFocus={ handleFocus }
        className='text-left font-medium'
      />;
    },
  },
  {
    accessorKey: 'description',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Description" />,
    cell: ({ getValue, row, column, table }) => {
      const [value, setValue] = useState(getValue<string>());
      return <Input
        value={ value }
        placeholder={ value }
        onChange={ (event) => setValue(event.target.value) }
        onBlur={ () => table.options.meta?.updateData(row.index, column.id, value) }
      />;
    },
  },
  {
    accessorKey: 'tags',
    header: ({ column }) => <DataTableColumnHeader column={ column } title="Attached tags" />,
    cell: ({ row }) => <TagsCell row={ row } />,
  },
];
