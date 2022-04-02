import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {fetchClassLab} from '../LabsGrid.thunks';

export type FetchClassLab = (classLabId: string) => void;

export const useFetchClassLab = (): FetchClassLab => {
  const dispatch = useDispatch();
  return useCallback((classLabId) => dispatch(fetchClassLab(classLabId)), [dispatch]);
}
