import React, {PropsWithChildren} from 'react';
import {useMounting} from '../../hooks';
import {useFetchUser} from '../../hooks/useFetchUser';

export type FetchUserProps = {};

const FetchUser: React.FC<PropsWithChildren<FetchUserProps>> = (props) => {
	const {children} = props;
	const fetchUser = useFetchUser();

	useMounting(() => {
		fetchUser();
	})

	return (
		<>
			{children}
		</>
	)
}

export default React.memo(FetchUser);