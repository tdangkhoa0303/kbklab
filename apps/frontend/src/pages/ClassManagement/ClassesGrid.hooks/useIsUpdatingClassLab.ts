import {useLoading} from 'shared/hooks';
import {updateClassLab} from '../ClassesGrid.thunks';

export const useIsUpdatingClassLab = (): boolean =>
  useLoading([updateClassLab]);
