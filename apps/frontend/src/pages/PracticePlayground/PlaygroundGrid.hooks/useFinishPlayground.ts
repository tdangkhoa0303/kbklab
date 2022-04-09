import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {finishPlaygroundThunk} from '../PlaygroundGrid.thunks';

export type FinishPlayground = (id: string) => void;

export const useFinishPlayground = (): FinishPlayground => {
  const dispatch = useDispatch();
  return useCallback((playgroundId: string) => dispatch(finishPlaygroundThunk(playgroundId)), [dispatch])
}
