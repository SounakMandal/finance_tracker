import { Row } from '@tanstack/react-table';
import { Expense } from './columns';
import { Badge } from '@/components/ui/badge';
import { Each } from '@/components/utils/map';

interface TagsCellProps {
  row: Row<Expense>;
}

export function TagsCell({ row }: TagsCellProps) {
  return (
    <Each
      data={ row.original.tags }
      mapper={ (tag, index) => <Badge key={ index }>{ tag }</Badge> }
    />
  );
}
