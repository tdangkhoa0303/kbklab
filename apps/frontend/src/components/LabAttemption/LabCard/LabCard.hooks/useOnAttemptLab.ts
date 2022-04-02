import {MouseEventHandler, useCallback} from 'react';
import {useLoadingToast} from 'shared/hooks';
import {openInNewTab} from 'shared/utilities';
import {useAttemptLab, useAttemptLabStatus, useIsAttemptingLab,} from '../../hooks';
import {ClassLabId} from '../../types';

export interface UseOnAttemptLabParams {
  isStudent: boolean;
  instanceUrl?: string;
  classLabId: ClassLabId;
}

export const useOnAttemptLab = ({
  instanceUrl,
  classLabId,
  isStudent,
}: UseOnAttemptLabParams): MouseEventHandler<HTMLButtonElement> => {
  const attemptLab = useAttemptLab();
  const isAttemptingLab = useIsAttemptingLab();
  const attemptLabStatus = useAttemptLabStatus();

  const { showToast } = useLoadingToast({
    loading: isAttemptingLab,
    loadingMessage: 'Attempting lab.',
    successMessage: 'Attempt lab successfully',
    errorMessage: 'Lab attemption failed',
    status: attemptLabStatus,
  });

  return useCallback(
    (event) => {
      event.stopPropagation();
      if (instanceUrl) {
        return openInNewTab(instanceUrl);
      }

      showToast();
      attemptLab({
        classLabId,
        isStudent,
      });
    },
    [instanceUrl, showToast, attemptLab, classLabId, isStudent]
  );
};
