import {useCallback} from 'react';
import {useSelector} from 'react-redux';
import {useDispatchWithToast} from 'shared/hooks';
import {finishPlaygroundStatusSelector} from '../PlaygroundGrid.selectors';
import {finishPlaygroundThunk} from '../PlaygroundGrid.thunks';

export type FinishPlayground = (id: string) => void;

export const useFinishPlayground = (): FinishPlayground => {
  const finishPlaygroundStatus = useSelector(finishPlaygroundStatusSelector);
  const finishPlayground = useDispatchWithToast<string, string>({
    thunkAction: finishPlaygroundThunk,
    toastParams: {
      status: finishPlaygroundStatus,
      successMessage: 'Finished playground successfully',
      loadingMessage: 'Finishing playground',
      errorMessage: 'Failed playground finishing'
    }
  });
  return useCallback((playgroundId: string) => finishPlayground(playgroundId), [finishPlayground])
}
