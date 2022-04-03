import {useSelector} from 'react-redux';
import {Class} from 'shared/models';
import {classesEntitiesSelector} from '../ClassesGrid.selectors';

export const useClassesEntitiesState = (): Record<string, Class> =>
  useSelector(classesEntitiesSelector).entities as Record<string, Class>;
