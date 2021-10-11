import {useAppSelector} from './useAppSelector';
import {User} from 'shared/models';

export const useUser = (): User => useAppSelector(state => state.user as User);