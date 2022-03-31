import { useSelector } from 'react-redux';
import { Class } from 'shared/models';
import { allClassesSelector } from '../ClassesGrid.selectors';

export const useAllClasses = (): Class[] => useSelector(allClassesSelector);
