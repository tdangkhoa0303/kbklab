import {useMounting} from 'shared/hooks';
import React from 'react';

export interface FetchAppDataProps {
	requests: VoidFunction[]
}

const FetchAppData: React.FC<FetchAppDataProps> = (props) => {
	const {requests} = props;

	useMounting(() => {
		requests.forEach(request => request());
	})

	return <></>
}

export default React.memo(FetchAppData);
