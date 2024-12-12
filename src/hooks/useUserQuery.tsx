import { getExpenseCategories } from '@/actions/user';
import { User } from '@/interface/user';
import { useQuery } from '@tanstack/react-query';

export const useUserQuery = <T,>(select?: (data: User["expense_types"]) => T) => {
  return useQuery<User["expense_types"], Error, T>({
    queryKey: ["getExpenseCategories"],
    queryFn: getExpenseCategories,
    select,
  });
};
