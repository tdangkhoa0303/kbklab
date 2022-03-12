import {ButtonProps} from '@mui/material/Button';
import {useMemo} from 'react';

export interface UseButtonPropsReturnedValues {
	primaryButtonProps: Partial<ButtonProps>;
	secondaryButtonProps: Partial<ButtonProps>;
}

export interface UseButtonPropsParams {
	isError: boolean;
	isLoading?: boolean;
	isDisabled?: boolean;
	handleSubmitForm: VoidFunction;
}

export const useButtonProps = ({
	isError,
	isLoading,
	isDisabled,
	handleSubmitForm,
}: UseButtonPropsParams): UseButtonPropsReturnedValues =>
	useMemo(
		() => ({
			primaryButtonProps: {
				disabled: isDisabled || isLoading || isError,
				onClick: handleSubmitForm,
			},
			secondaryButtonProps: {
				disabled: isLoading,
			},
		}),
		[isDisabled, isLoading, isError, handleSubmitForm]
	);
