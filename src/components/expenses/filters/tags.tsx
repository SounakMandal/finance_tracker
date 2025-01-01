import { Each } from '@/components/utils/map';
import { AccordionStyledItem } from '@/components/wrapper/accordion/item';
import { useUserQuery } from '@/hooks/useUserQuery';
import { Column } from '@tanstack/react-table';
import { convertToTitleCase } from '@/utils/case';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFilterStore } from './store';

export function TagsFilter<TData>({ column }: { column: Column<TData, unknown>; }) {
  const { data: tags } = useUserQuery((user) => user.tags);
  const filters = useFilterStore((state) => state.filters);
  const updateFilters = useFilterStore((state) => state.updateFilters);
  const value = filters[column.id] as string;
  return (
    <AccordionStyledItem label='Tags'>
      <Select
        value={ value }
        onValueChange={ value => updateFilters({ tags: value }) }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          <Each
            data={ tags ?? [] }
            mapper={ (tag) => (
              <SelectItem key={ tag } value={ tag }>
                { convertToTitleCase(tag) }
              </SelectItem>
            ) }
          />
        </SelectContent>
      </Select>
    </AccordionStyledItem>
  );
}
