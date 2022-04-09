import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useDispatchWithToast} from 'shared/hooks';
import {startPlaygroundStatusSelector} from '../PlaygroundGrid.selectors';
import {startPlaygroundThunk} from '../PlaygroundGrid.thunks';
import {StartPlaygroundFulfilledPayload} from '../PlaygroundGrid.types';

export type StartPlayground = (id: string) => void;

export const useStartPlayground = (): StartPlayground => {
  const startPlaygroundStatus = useSelector(startPlaygroundStatusSelector);
  const startPlayground = useDispatchWithToast<StartPlaygroundFulfilledPayload, string>({
    thunkAction: startPlaygroundThunk,
    toastParams: {
      status: startPlaygroundStatus,
      successMessage: 'Started playground successfully',
      loadingMessage: 'Starting playground',
      errorMessage: 'Failed playground finishing'
    }
  });
  return useCallback((playgroundId: string) => startPlayground(playgroundId), [startPlayground])
}
