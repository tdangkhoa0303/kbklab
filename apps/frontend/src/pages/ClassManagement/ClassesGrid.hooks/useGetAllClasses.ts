import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { getAllClasses } from '../ClassesGrid.thunks';

export const useGetAllClasses = () => {
  const dispatch = useDispatch();
  return useCallback(() => dispatch(getAllClasses()), [dispatch]);
};
