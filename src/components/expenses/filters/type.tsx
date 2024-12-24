import { Select, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AccordionStyledItem } from '@/components/wrapper/accordion/item';
import { ExpenseType } from '../expense-type';
import { Column } from '@tanstack/react-table';
import { useFilterStore } from './store';

export function ExpenseTypeFilter<TData>({ column }: { column: Column<TData, unknown>; }) {
  const filters = useFilterStore((state) => state.filters);
  const updateFilters = useFilterStore((state) => state.updateFilters);
  const value = filters[column.id];
  return (
    <AccordionStyledItem label='Type'>
      <Select
        value={ value }
        onValueChange={ value => updateFilters({ category: value }) }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <ExpenseType />
      </Select>
    </AccordionStyledItem >
  );
}
