import {createLabInstance, fetchStudentLabs} from './StudentDashboard.thunks'
import {useDispatch} from 'react-redux';
import {useCallback} from 'react';
import {useAppSelector} from '../shared/hooks';
import {createLabInstanceStatusSelector, selectedLabSelector, studentLabsSelector} from './StudentDashboard.selectors';
import {Lab} from 'shared/models';
import {ResponseStatus} from '../shared/constants';
import {setSelectedLab} from './StudentDashboard.slice';
import {useLoading} from '../shared/hooks/useLoading';

export const useFetchStudentLabs = () => {
	const dispatch = useDispatch();
	return useCallback(() => dispatch(fetchStudentLabs()), [dispatch]);
}

type CreateLabInstanceCallback = (labId: string) => void;
export const useCreateLabInstance = (): CreateLabInstanceCallback => {
	const dispatch = useDispatch();
	return useCallback((labId) => dispatch(createLabInstance(labId)), [dispatch]);
}

export const useCreateLabInstanceStatus = (): ResponseStatus | null => useAppSelector(createLabInstanceStatusSelector);

export const useStudentLabs = (): Lab[] => useAppSelector(studentLabsSelector);

type SetSelectedLabCallback = (labId: string | null) => void;
export const useSetSelectedLab = (): SetSelectedLabCallback => {
	const dispatch = useDispatch();
	return useCallback((labId: string | null) => dispatch(setSelectedLab(labId)), [dispatch]);
}

export const useSelectedLab = (): Lab | null => useAppSelector(selectedLabSelector);

export const useIsCreatingLabInstance = (): boolean => useLoading([createLabInstance]);