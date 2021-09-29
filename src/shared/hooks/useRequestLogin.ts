import {LoginPayload} from 'shared/components/AppProvider/FetchUser.types';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {login} from 'shared/components/AppProvider/FetchUser.thunk';

type RequestLoginCallback = (payload: LoginPayload) => void;
export const useRequestLogin = (): RequestLoginCallback => {
	const dispatch = useDispatch();
	return useCallback((payload) => dispatch(login(payload)), [dispatch])
}