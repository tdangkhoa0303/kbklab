import {AsyncThunk} from '@reduxjs/toolkit';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useLoading} from './useLoading';
import {LoadingToastParams, useLoadingToast} from './useLoadingToast';

export interface DispatchWithToastParams<Returned, ThunkArg = void> {
  toastParams: Omit<LoadingToastParams, 'loading'>;
  // eslint-disable-next-line @typescript-eslint/ban-types
  thunkAction: AsyncThunk<Returned, ThunkArg, {}>
}

export type DispatchWithToastCallback<TParams> = (params: TParams) => void;

export const useDispatchWithToast = <Returned, ThunkArg>({toastParams, thunkAction}: DispatchWithToastParams<Returned, ThunkArg>): DispatchWithToastCallback<ThunkArg> => {
  const dispatch = useDispatch();
  const isLoading = useLoading([thunkAction]);
  const {showToast} = useLoadingToast({
    ...toastParams,
    loading: isLoading,
  })

  return useCallback((params: ThunkArg) => {
    dispatch(thunkAction(params));
    showToast();
  }, [dispatch, showToast, thunkAction])
};
