import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {startPlaygroundThunk} from '../PlaygroundGrid.thunks';

export type StartPlayground = (id: string) => void;

export const useStartPlayground = (): StartPlayground => {
  const dispatch = useDispatch();
  return useCallback((playgroundId: string) => dispatch(startPlaygroundThunk(playgroundId)), [dispatch])
}
