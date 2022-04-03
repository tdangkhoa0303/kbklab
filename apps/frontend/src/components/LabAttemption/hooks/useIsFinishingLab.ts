import {useLoading} from 'shared/hooks';
import {finishLabThunk} from '../thunks';

export const useIsFinishingLab = (): boolean => useLoading([finishLabThunk]);
