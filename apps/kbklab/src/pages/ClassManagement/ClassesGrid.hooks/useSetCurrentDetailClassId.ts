import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {setCurrentDetailClassId} from '../ClassesGrid.slice';

export type SetCurrentDetailClassId = (classId: string | null) => void;

export const useSetCurrentDetailClassId = (): SetCurrentDetailClassId => {
	const dispatch = useDispatch();

	return useCallback((classId) => dispatch(setCurrentDetailClassId(classId)), [dispatch])
}
