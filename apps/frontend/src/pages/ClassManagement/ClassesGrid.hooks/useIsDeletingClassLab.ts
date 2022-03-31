import { useLoading } from 'shared/hooks';
import { deleteClassLab } from '../ClassesGrid.thunks';

export const useIsDeletingClassLab = (): boolean =>
  useLoading([deleteClassLab]);
