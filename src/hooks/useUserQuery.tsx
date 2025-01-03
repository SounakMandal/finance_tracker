import { useQuery } from '@tanstack/react-query';
import { getUser } from '@/actions/user';
import { User } from '@/interface/user';
import { userKeys } from '@/data/key';

export const useUserQuery = <T,>(select?: (data: User) => T) => {
  return useQuery<User, Error, T>({
    queryKey: userKeys.query,
    queryFn: getUser,
    select,
  });
};
