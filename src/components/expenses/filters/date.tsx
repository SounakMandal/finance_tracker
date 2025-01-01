import { useState } from 'react';
import { AccordionStyledItem } from '@/components/wrapper/accordion/item';
import { Column } from '@tanstack/react-table';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useFilterStore } from './store';
import { Label } from '@/components/ui/label';

function DatePicker<TData>({ column, id }: { column: Column<TData, unknown>; id: 'min' | 'max'; }) {
  const filters = useFilterStore((state) => state.filters);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const updateFilters = useFilterStore((state) => state.updateFilters);
  const columnFilterValue = filters[column.id] as [Date, Date];
  const value = columnFilterValue?.[id === 'min' ? 0 : 1];
  return (
    <Popover open={ calendarOpen } onOpenChange={ setCalendarOpen }>
      <div className='mt-4 grid w-full max-w-sm items-center gap-1.5'>
        <Label htmlFor={ id }>{ id === 'min' ? 'Start Date' : 'End Date' }</Label>
        <PopoverTrigger asChild>
          <div>
            <Button variant={ 'outline' } className={ cn('w-full pl-3 text-left font-normal', !value && 'text-muted-foreground') }>
              { value ?
                format(value, 'PPP') :
                <span>{ id === 'min' ? 'Pick start date' : 'Pick end date' }</span>
              }
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </div>
        </PopoverTrigger>
      </div>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={ value }
          onSelect={ value => {
            setCalendarOpen(false);
            updateFilters({
              date: id === 'min' ?
                [value, filters.date?.[1]] :
                [filters.date?.[0], value]
            });
          } }
          disabled={ (date: Date) => date > new Date() || date < new Date('1900-01-01') }
        />
      </PopoverContent>
    </Popover>
  );
}

export function DateFilter<TData>({ column }: { column: Column<TData, unknown>; }) {

  return (
    <AccordionStyledItem label='Date'>
      <DatePicker column={ column } id='min' />
      <DatePicker column={ column } id='max' />
    </AccordionStyledItem>
  );
};
