'use client';

import { useViewQuery } from '@/hooks/useViewQuery';

export default function ExpenseViews() {
  const { data } = useViewQuery(views => views);
  return <div>
    { data?.map(item => JSON.stringify(item)) }
  </div>;
}
