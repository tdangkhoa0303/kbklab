import {useIsCreatingLabInstance} from './useIsCreatingLabInstance';
import {useCreateLabInstanceStatus} from './useCreateLabInstanceStatus';
import {useLoadingToast} from '../../shared/hooks/useLoadingToast';
import {useEffect} from 'react';

export const useCreateLabInstanceToast = (): void => {
	const isCreatingLabInstance = useIsCreatingLabInstance();
	const creatingLabInstanceStatus = useCreateLabInstanceStatus();
	const {showToast, toastId} = useLoadingToast({
		loading: isCreatingLabInstance,
		loadingMessage: 'Creating lab instance.',
		successMessage: 'Creating lab instance successfully',
		errorMessage: 'Failed to create lab instance',
		status: creatingLabInstanceStatus
	})

	useEffect(() => {
		if(isCreatingLabInstance && !toastId && !creatingLabInstanceStatus) {
			showToast()
		}
		// Just want to listen to creating lab instance status
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCreatingLabInstance])
}