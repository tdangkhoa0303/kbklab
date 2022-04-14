import {useLoading} from 'shared/hooks';
import {getAllClasses} from '../ClassesGrid.thunks';

export const useIsFetchingClasses = () => useLoading([getAllClasses]);
