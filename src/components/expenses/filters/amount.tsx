import { Column } from '@tanstack/react-table';
import { AccordionStyledItem } from '@/components/wrapper/accordion/item';
import { Label } from '@/components/ui/label';
import { useFilterStore } from './store';
import { Input } from '@/components/ui/input';
import { useState } from 'react';

function AmountFilterInput<TData>({ column, id }: { column: Column<TData, unknown>; id: 'min' | 'max'; }) {
  const filters = useFilterStore((state) => state.filters);
  const updateFilters = useFilterStore((state) => state.updateFilters);
  const columnFilterValue = filters[column.id] as [number, number];
  const [value, setValue] = useState(columnFilterValue?.[id === 'min' ? 0 : 1]);
  return (
    <div className="mt-4 grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={ id }>{ id === 'min' ? 'Minimum Amount' : 'Maximum Amount' }</Label>
      <Input
        id={ id }
        placeholder={ id === 'min' ? 'Minimum' : 'Maximum' }
        defaultValue={ value }
        onChange={ event => {
          const value = parseFloat(event.target.value);
          setValue(value);
          updateFilters({
            amount: id === 'min' ?
              [value, filters.amount?.[1]] :
              [filters.amount?.[0], value]
          });
        } }
        className="max-w-sm"
      />
    </div>
  );
}

export function AmountFilter<TData>({ column }: { column: Column<TData, unknown>; }) {
  return (
    <AccordionStyledItem label='Amount'>
      <AmountFilterInput column={ column } id='min' />
      <AmountFilterInput column={ column } id='max' />
    </AccordionStyledItem>
  );
}
