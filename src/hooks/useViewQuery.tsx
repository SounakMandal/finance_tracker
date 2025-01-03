import { getViews } from '@/actions/view';
import { viewKeys } from '@/data/key';
import { View } from '@/interface/view';
import { useQuery } from '@tanstack/react-query';

export const useViewQuery = <T,>(select?: (data: View[]) => T) => {
  return useQuery<View[], Error, T>({
    queryKey: viewKeys.query,
    queryFn: getViews,
    select,
  });
};
