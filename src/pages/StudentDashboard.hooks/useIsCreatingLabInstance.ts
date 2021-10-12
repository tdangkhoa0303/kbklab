import {useLoading} from 'shared/hooks/useLoading';
import {createLabInstance} from '../StudentDashboard.thunks';

export const useIsCreatingLabInstance = (): boolean => useLoading([createLabInstance]);