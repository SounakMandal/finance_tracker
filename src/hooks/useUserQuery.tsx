import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/actions/user';
import { User } from '@/interface/user';

export const useUserQuery = <T,>(select?: (data: User) => T) => {
  return useQuery<User, Error, T>({
    queryKey: ['getUser'],
    queryFn: getUser,
    select,
  });
};
