import {useLoading} from 'shared/hooks';
import {fetchClassLab} from '../LabsGrid.thunks';

export const useIsFetchingClassLab = (): boolean => useLoading([fetchClassLab])
