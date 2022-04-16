import {useSelector} from 'react-redux';
import {ResponseStatus} from 'shared/constants';
import {deleteClassesStatusSelector} from '../ClassesGrid.selectors';

export const useDeleteClassesStatus = (): ResponseStatus | null => useSelector(deleteClassesStatusSelector);
