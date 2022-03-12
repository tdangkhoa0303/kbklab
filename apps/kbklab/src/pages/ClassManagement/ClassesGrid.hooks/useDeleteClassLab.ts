import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {deleteClassLab} from '../ClassesGrid.thunks';
import {DeleteClassLabPayload} from '../ClassesGrid.types';

export type DeleteClassLabHandler = (payload: DeleteClassLabPayload) => void;

export const useDeleteClassLab = (): DeleteClassLabHandler => {
	const dispatch = useDispatch();
	return useCallback((payload: DeleteClassLabPayload) => dispatch(deleteClassLab(payload)), [])
}
