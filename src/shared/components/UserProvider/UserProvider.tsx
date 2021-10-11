import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {useMounting} from 'shared/hooks';
import {useFetchUser} from 'shared/hooks/useFetchUser';
import {useCookies} from 'react-cookie';
import {useFetchUserInfoStatus} from './UserProvider.hooks';

export type UserProviderProps = {};

const UserProvider: React.FC<PropsWithChildren<UserProviderProps>> = (props) => {
	const {children} = props;
	const [{signed}] = useCookies(['signed']);
	const fetchUser = useFetchUser();
	const [isUserReady, setIsUserReady] = useState<boolean>(!Boolean(signed));
	const setUserReady = useRef<boolean>(null);
	const fetchUserInfoStatus = useFetchUserInfoStatus();

	useMounting(() => {
		if(Boolean(signed)) {
			fetchUser();
		}
	});

	useEffect(() => {
		if(!setUserReady.current && fetchUserInfoStatus) {
			setIsUserReady(true)
		}
	}, [fetchUserInfoStatus])

	return (
		<>
			{isUserReady && children}
		</>
	)
}

export default React.memo(UserProvider);