import {useIsCreatingLabInstance} from './useIsCreatingLabInstance';
import {useCreateLabInstanceStatus} from './useCreateLabInstanceStatus';
import {ShowToastCallback, useLoadingToast} from '../../shared/hooks/useLoadingToast';

export const useCreateLabInstanceToast = (): ShowToastCallback => {
	const isCreatingLabInstance = useIsCreatingLabInstance();
	const creatingLabInstanceStatus = useCreateLabInstanceStatus();
	const {showToast} = useLoadingToast({
		loading: isCreatingLabInstance,
		loadingMessage: 'Creating lab instance.',
		successMessage: 'Creating lab instance successfully',
		errorMessage: 'Failed to create lab instance',
		status: creatingLabInstanceStatus
	})

	return showToast
}