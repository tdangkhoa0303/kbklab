import {useSelector} from 'react-redux';
import {ResponseStatus} from 'shared/constants';
import {deleteLecturersStatusSelector} from '../LecturersGrid.selectors';

export const useDeleteLecturersStatus = (): ResponseStatus | null => useSelector(deleteLecturersStatusSelector)
