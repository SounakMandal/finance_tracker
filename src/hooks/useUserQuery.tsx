import { useQuery } from '@tanstack/react-query';
import { getExpenseCategories } from '@/actions/user';
import { User } from '@/interface/user';

export const useUserQuery = <T, >(select?: (data: User['expense_types']) => T) => {
  return useQuery<User['expense_types'], Error, T>({
    queryKey: ['getExpenseCategories'],
    queryFn: getExpenseCategories,
    select,
  });
};
