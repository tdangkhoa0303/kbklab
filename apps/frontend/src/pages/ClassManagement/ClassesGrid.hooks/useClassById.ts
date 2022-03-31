import { useSelector } from 'react-redux';
import { RootState } from 'shared/redux/rootReducers';
import { classByIdSelector } from '../ClassesGrid.selectors';

export const useClassById = (classId: string) =>
  useSelector((rootState: RootState) => classByIdSelector(rootState, classId));
