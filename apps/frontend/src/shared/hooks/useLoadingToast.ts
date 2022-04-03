import {ReactText, useCallback, useEffect, useState} from 'react';
import {toast, ToastOptions} from 'react-toastify';
import {ResponseStatus} from '../constants';

export interface LoadingToastParams {
  loading: boolean;
  successMessage: string;
  errorMessage: string;
  loadingMessage: string;
  status: ResponseStatus | null;
}

export type ShowToastCallback = (options?: ToastOptions) => void;

export interface LoadingToastReturnValues {
  toastId: ReactText | null;
  showToast: ShowToastCallback;
}
export const useLoadingToast = ({
  loading,
  loadingMessage,
  successMessage,
  errorMessage,
  status,
}: LoadingToastParams): LoadingToastReturnValues => {
  const [toastId, setToastId] = useState<ReactText | null>(null);

  useEffect(() => {
    if (loading || !status || !toastId) {
      return;
    }

    switch (status) {
      case ResponseStatus.Success:
        toast.update(toastId, {
          render: successMessage,
          isLoading: false,
          type: 'success',
          autoClose: 3000,
          closeOnClick: true,
        });
        break;
      case ResponseStatus.Failed:
        toast.update(toastId, {
          render: errorMessage,
          isLoading: false,
          type: 'error',
          autoClose: 3000,
          closeOnClick: true,
        });
        break;
      default:
        break;
    }
    setToastId(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const showToast = useCallback(
    (options) => {
      setToastId(toast.loading(loadingMessage, options));
    },
    [loadingMessage]
  );

  return {
    toastId,
    showToast,
  };
};
