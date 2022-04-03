import {useSelector} from 'react-redux';
import {RootState} from 'shared/redux/rootReducers';
import {classByCodeSelector} from '../ClassesGrid.selectors';

export const useClassByCode = (code: string) =>
  useSelector((rootState: RootState) => classByCodeSelector(rootState, code));
