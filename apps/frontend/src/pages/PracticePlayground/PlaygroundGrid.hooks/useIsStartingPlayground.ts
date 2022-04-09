import {useLoading} from 'shared/hooks';
import {startPlaygroundThunk} from '../PlaygroundGrid.thunks';

export const useIsStartingPlayground = (): boolean => useLoading([startPlaygroundThunk])
