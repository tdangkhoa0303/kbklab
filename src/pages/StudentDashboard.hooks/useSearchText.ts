import {useAppSelector} from 'shared/hooks';
import {searchTextSelector} from '../StudentDashboard.selectors';

export const useSearchText = (): string => useAppSelector(searchTextSelector);