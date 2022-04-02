import {useSelector} from 'react-redux';
import {studentLabEntitiesStateSelector} from '../LabsGrid.selectors';

export const useStudentLabEntities = () =>
  useSelector(studentLabEntitiesStateSelector);
