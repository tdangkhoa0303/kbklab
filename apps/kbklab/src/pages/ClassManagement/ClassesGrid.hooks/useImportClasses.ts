import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {importClasses} from '../ClassesGrid.thunks';

export type ImportLecturersCallback = (data: FormData) => void;
export const useImportClasses = (): ImportLecturersCallback => {
	const dispatch = useDispatch();

	return useCallback((data: FormData) => dispatch(importClasses(data)), [dispatch])
}
