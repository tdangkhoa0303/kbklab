import {useAppSelector} from 'shared/hooks';
import {fetchUserInfoStatusSelector, isLoginSuccessSelector} from './UserProvider.selectors';

export const useIsLoginSuccess = () => {
	return useAppSelector(isLoginSuccessSelector);
}

export const useFetchUserInfoStatus = () => {
	return useAppSelector(fetchUserInfoStatusSelector);
}