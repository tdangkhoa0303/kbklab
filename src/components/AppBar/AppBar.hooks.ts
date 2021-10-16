import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {setSearchText} from './AppBar.slice';

export const useSetSearchText = (): (searchText: string) => void => {
	const dispatch = useDispatch();
	return useCallback((searchText: string) => dispatch(setSearchText(searchText)), [dispatch])
}