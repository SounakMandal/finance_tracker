import { useState } from 'react';
import { Row } from '@tanstack/react-table';
import { type Expense } from '@/interface/expense';
import { TagsDisplayArea } from '../tags-display';

interface TagsCellProps {
  row: Row<Expense>;
}

export function TagsCell({ row }: TagsCellProps) {
  const [tags, setTags] = useState(row.original.tags);
  return <TagsDisplayArea tags={ tags } onChange={ setTags } />;
}
