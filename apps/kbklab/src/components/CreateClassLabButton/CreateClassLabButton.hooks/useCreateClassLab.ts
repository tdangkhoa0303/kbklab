import {useLoadingToast} from 'shared/hooks';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {createClassLab} from '../CreateClassLabButton.thunks';
import {CreateClassLabPayload} from '../CreateClassLabButton.types';
import {useCreateClassLabStatus} from './useCreateClassLabStatus';
import {useIsCreatingClassLab} from './useIsCreatingClassLab';

export const useCreateClassLab = () => {
	const dispatch = useDispatch();
	const isCreatingClassLab = useIsCreatingClassLab();
	const createClassLabStatus = useCreateClassLabStatus();
	const {showToast} = useLoadingToast({
		successMessage: 'Class lab created successfully',
		errorMessage: 'Class lab creation failed',
		loadingMessage: 'Creating class lab',
		loading: isCreatingClassLab,
		status: createClassLabStatus,
	});

	return useCallback(
		(createClassLabPayload: CreateClassLabPayload) => {
			showToast();
			dispatch(createClassLab(createClassLabPayload));
		},
		[dispatch, showToast]
	);
};
