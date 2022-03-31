import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { userStateSelector } from '../components/UserProvider/UserProvider.selectors';
import { User } from '../models';

export const useUser = (): User => {
  const userState = useSelector(userStateSelector);
  return useMemo(() => userState.currentUser as User, [userState]);
};
