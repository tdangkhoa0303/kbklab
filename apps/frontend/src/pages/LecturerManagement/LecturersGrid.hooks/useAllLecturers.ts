import {useSelector} from 'react-redux';
import {Lecturer} from 'shared/models';
import {allLecturersSelector} from '../LecturersGrid.selectors';

export const useAllLecturers = (): Lecturer[] =>
  useSelector(allLecturersSelector);
