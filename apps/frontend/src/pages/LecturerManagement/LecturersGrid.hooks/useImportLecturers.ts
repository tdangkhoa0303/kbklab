import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {importLecturers} from '../LecturersGrid.thunks';

export type ImportLecturersCallback = (data: FormData) => void;
export const useImportLecturers = (): ImportLecturersCallback => {
  const dispatch = useDispatch();

  return useCallback(
    (data: FormData) => dispatch(importLecturers(data)),
    [dispatch]
  );
};
