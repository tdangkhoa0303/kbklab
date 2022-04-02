import {useLoading} from 'shared/hooks';
import {createClassLab} from '../CreateClassLabButton.thunks';

export const useIsCreatingClassLab = (): boolean =>
  useLoading([createClassLab]);
