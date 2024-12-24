import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from '@/components/ui/select';
import { Each } from '@/components/utils/map';
import { useUserQuery } from '@/hooks/useUserQuery';
import { convertToTitleCase } from '@/utils/case';

export function ExpenseType() {
  const { data } = useUserQuery((user) => {
    const needs: string[] = [];
    const wants: string[] = [];
    Object.entries(user.expense_types).forEach(([category, type]) => {
      switch (type.category) {
        case 'needs':
          needs.push(category);
          break;
        case 'wants':
          wants.push(category);
          break;
      }
    });
    return { needs, wants };
  }
  );
  return (
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Needs</SelectLabel>
        <Each
          data={ data?.needs ?? [] }
          mapper={ (item, index) => <SelectItem key={ index } value={ item }>
            { convertToTitleCase(item) }
          </SelectItem> }
        />
      </SelectGroup>

      <SelectGroup>
        <SelectLabel>Wants</SelectLabel>
        <Each
          data={ data?.wants ?? [] }
          mapper={ (item, index) => <SelectItem key={ index } value={ item }>
            { convertToTitleCase(item) }
          </SelectItem> }
        />
      </SelectGroup>
    </SelectContent>
  );
}
