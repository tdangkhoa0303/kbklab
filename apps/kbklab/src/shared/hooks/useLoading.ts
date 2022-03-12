import {AsyncThunk} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../constants';

export const useLoading = (actions: AsyncThunk<any, any, any>[]): boolean => {
	const {currentActions} = useSelector((state: RootState) => state.asyncActions);

	return useMemo(() => (
		actions.every(({typePrefix}) => currentActions[typePrefix])
	), [actions, currentActions])
}
