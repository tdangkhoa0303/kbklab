import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {fetchStudentLabs} from '../LabsGrid.thunks';

export const useFetchStudentLabs = () => {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(fetchStudentLabs()), [dispatch]);
};
