import { Row } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { Each } from '@/components/utils/map';
import { type Expense } from '@/interface/expense';

interface TagsCellProps {
  row: Row<Expense>;
}

export function TagsCell({ row }: TagsCellProps) {
  return (
    <Each
      data={ row.original.tags ?? [] }
      mapper={ (tag, index) => <span key={ index } className='p-1'>
        <Badge>{ tag }</Badge>
      </span> }
    />
  );
}
