import {useSelector} from 'react-redux';
import {currentDetailClassSelector} from '../ClassesGrid.selectors';

export const useCurrentClassDetail = () => useSelector(currentDetailClassSelector);
