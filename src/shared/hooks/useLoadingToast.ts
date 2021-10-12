import {ResponseStatus} from '../constants';
import {ReactText, useCallback, useEffect, useState} from 'react';
import {toast, ToastOptions} from 'react-toastify';

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
	const [toastId, setToastId] = useState<ReactText | null>(null);

	useEffect(() => {
		if(loading || !status || !toastId) {
			return;
		}

		switch (status) {
			case ResponseStatus.Success:
				return toast.update(toastId, {
					render: successMessage,
					isLoading: false,
					type: 'success'
				})
			case ResponseStatus.Failed:
				return toast.update(toastId, {
					render: errorMessage,
					isLoading: false,
					type: 'error'
				})
			default:
				return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [status, loading])

	return useCallback((options) => {
		setToastId(toast.loading(loadingMessage, options));
	}, [setToastId, loadingMessage]);
}