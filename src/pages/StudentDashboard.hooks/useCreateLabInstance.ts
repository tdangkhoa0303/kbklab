import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {createLabInstance} from '../StudentDashboard.thunks';

type CreateLabInstanceCallback = (labId: string) => void;
export const useCreateLabInstance = (): CreateLabInstanceCallback => {
	const dispatch = useDispatch();
	return useCallback((labId) => dispatch(createLabInstance(labId)), [dispatch]);
}