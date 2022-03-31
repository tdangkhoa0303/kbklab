import { useSelector } from 'react-redux';
import { Lab } from 'shared/models';
import { allLabsSelector } from '../CreateClassLabButton.selectors';

export const useAllLabs = (): Lab[] => useSelector(allLabsSelector);
