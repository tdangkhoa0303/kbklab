import {AsyncThunk} from '@reduxjs/toolkit';
import {useAppSelector} from './useAppSelector';
import {useMemo} from 'react';

export const useLoading = (actions: AsyncThunk<any, any, any>[]): boolean => {
	const asyncActions = useAppSelector(state => state.asyncActions);
	return useMemo(() => (
		actions.every(({typePrefix}) => asyncActions[typePrefix])
	), [actions, asyncActions])
}