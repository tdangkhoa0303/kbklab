import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {fetchPlaygroundsThunk} from '../PlaygroundGrid.thunks';

export const useFetchPlaygrounds = (): VoidFunction => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(fetchPlaygroundsThunk()), [dispatch])
}
