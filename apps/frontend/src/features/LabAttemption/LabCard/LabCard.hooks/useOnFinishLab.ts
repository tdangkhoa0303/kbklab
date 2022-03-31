import { MouseEventHandler, useCallback } from 'react';
import { useLoadingToast } from 'shared/hooks';
import {
  useFinishLab,
  useFinishLabStatus,
  useIsFinishingLab,
} from '../../hooks';
import { ClassLabId } from '../../types';

export interface UseOnFinishLabParams {
  isStudent: boolean;
  classLabId: ClassLabId;
}

export const useOnFinishLab = ({
  isStudent,
  classLabId,
}: UseOnFinishLabParams): MouseEventHandler<HTMLButtonElement> => {
  const finishLab = useFinishLab();
  const isFinishingLabAttempt = useIsFinishingLab();
  const finishLabStatus = useFinishLabStatus();

  const { showToast } = useLoadingToast({
    loading: isFinishingLabAttempt,
    loadingMessage: 'Finishing attempt.',
    successMessage: 'Finishing lab attempt successfully',
    errorMessage: 'Failed to finish lab attempt',
    status: finishLabStatus,
  });

  return useCallback(
    (event) => {
      event.stopPropagation();
      showToast();
      finishLab({ classLabId, isStudent });
    },
    [showToast, finishLab, classLabId]
  );
};
