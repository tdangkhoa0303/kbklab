import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {fetchStudentLabs} from '../StudentDashboard.thunks';

export const useFetchStudentLabs = () => {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(fetchStudentLabs()), [dispatch]);
}