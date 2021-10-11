import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {fetchUser} from 'shared/components/UserProvider/UserProvider.thunk';

export const useFetchUser = () => {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(fetchUser()), [dispatch]);
}