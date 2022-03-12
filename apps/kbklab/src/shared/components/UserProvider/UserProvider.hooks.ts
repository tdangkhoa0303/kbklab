import {useCallback} from 'react';
import {useCookies} from 'react-cookie';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserInfoStatusSelector, isLoginSuccessSelector} from './UserProvider.selectors';
import {logout} from './UserProvider.slice';
import {fetchUser, login} from './UserProvider.thunk';
import {LoginPayload} from './UserProvider.types';

export const useFetchUser = () => {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(fetchUser()), [dispatch]);
}

export const useIsLoginSuccess = () => {
	return useSelector(isLoginSuccessSelector);
}

export const useFetchUserInfoStatus = () => {
	return useSelector(fetchUserInfoStatusSelector);
}

export const useLogout = (): VoidFunction => {
	const dispatch = useDispatch();
	const [, , removeCookie] = useCookies(['signed']);

	return useCallback(() => {
		dispatch(logout({}));
		removeCookie('signed');
	}, [dispatch, removeCookie]);
}

type RequestLoginCallback = (payload: LoginPayload) => void;
export const useRequestLogin = (): RequestLoginCallback => {
	const dispatch = useDispatch();
	return useCallback((payload) => dispatch(login(payload)), [dispatch])
}
