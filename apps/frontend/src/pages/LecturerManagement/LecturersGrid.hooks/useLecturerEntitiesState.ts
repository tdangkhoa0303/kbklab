import { useSelector } from 'react-redux';
import { Lecturer } from 'shared/models';
import { lecturerEntitiesSelector } from '../LecturersGrid.selectors';

export const useLecturerEntitiesState = (): Record<string, Lecturer> =>
  useSelector(lecturerEntitiesSelector).entities as Record<string, Lecturer>;
