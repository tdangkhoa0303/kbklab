import {useLoading} from 'shared/hooks';
import {attemptLabThunk} from '../thunks';

export const useIsAttemptingLab = (): boolean => useLoading([attemptLabThunk]);
