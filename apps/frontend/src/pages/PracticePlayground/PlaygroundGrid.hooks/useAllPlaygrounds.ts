import {PlaygroundDTO} from '@kbklab/api-interfaces';
import {useSelector} from 'react-redux';
import {allPlaygroundsSelector} from '../PlaygroundGrid.selectors';

export const useAllPlaygrounds = (): PlaygroundDTO[] => useSelector(allPlaygroundsSelector);
