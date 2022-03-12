import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {updateClassLab} from '../ClassesGrid.thunks';
import {UpdateClassLabPayload} from '../ClassesGrid.types';

export const useUpdateClassLab = () => {
	const dispatch = useDispatch();
	return useCallback((payload: UpdateClassLabPayload) => dispatch(updateClassLab(payload)), [dispatch])
}
