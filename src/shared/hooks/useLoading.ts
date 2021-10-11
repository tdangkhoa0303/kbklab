import {AsyncThunk} from '@reduxjs/toolkit';
import {useAppSelector} from './useAppSelector';
import {getActionName} from 'shared/components/AppProvider/AsyncActions.reducers';
import {useMemo} from 'react';

export const useLoading = (actions: AsyncThunk<any, any, any>[]): boolean => {
	const asyncActions = useAppSelector(state => state.asyncActions);

	return useMemo(() => (
		actions.every(({typePrefix}) => asyncActions[getActionName(typePrefix)])
	), [actions, asyncActions])
}