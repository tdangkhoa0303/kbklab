import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {fetchUserClassLabs} from '../LabsGrid.thunks';

export const useFetchUserClassLabs = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(fetchUserClassLabs()), [dispatch]);
};
