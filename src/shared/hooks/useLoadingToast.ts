import {ResponseStatus} from '../constants';
import {ReactText, useCallback, useEffect, useRef} from 'react';
import {toast, ToastOptions} from 'react-toastify';
import {useMounting} from './useMounting';

export interface LoadingToastParams {
	loading: boolean,
	successMessage: string,
	errorMessage: string,
	loadingMessage: string,
	status: ResponseStatus | null
}

export interface LoadingToastReturnValues {
	showToast: VoidFunction
}
export const useLoadingToast = ({
	loading,
	loadingMessage,
	successMessage,
	errorMessage,
	status
}: LoadingToastParams): (options?: ToastOptions) => void => {
	const toastIdRef = useRef<ReactText | null>(null);

	useEffect(() => {
		const toastId = toastIdRef.current;
		if(loading || !status || !toastId) {
			return;
		}

		switch (status) {
			case ResponseStatus.Success:
				return toast.update(toastId, {
					render: successMessage,
					isLoading: false,
					type: 'success',
					autoClose: 3000,
					closeOnClick: true
				})
			case ResponseStatus.Failed:
				return toast.update(toastId, {
					render: errorMessage,
					isLoading: false,
					type: 'error',
					autoClose: 3000,
					closeOnClick: true
				})
			default:
				return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status])

	return useCallback((options) => {
		toastIdRef.current = toast.loading(loadingMessage, options);
	}, [loadingMessage]);
}