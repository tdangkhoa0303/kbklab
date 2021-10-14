import {useCallback, useMemo} from 'react';
import {Step} from 'shared/models';
import {useDispatch} from 'react-redux';
import {finishLabAttempt as finishLabAttemptThunk, finishLabAttempt} from '../StudentDashboard.thunks';
import {ResponseStatus} from '../../shared/constants';
import {useAppSelector} from '../../shared/hooks';
import {finishLabAttemptStatusSelector} from '../StudentDashboard.selectors';
import {useLoading} from '../../shared/hooks/useLoading';
import {useLoadingToast} from '../../shared/hooks/useLoadingToast';

export const useLabScore = (steps: Step[], stepSuccess?: boolean[]) => {
	return useMemo(() => {
		if(!stepSuccess) {
			return null;
		}

		return steps.reduce((totalScore, step, index) => {
			return totalScore + (stepSuccess[index] ? step.point : 0)
		}, 0)
	}, [stepSuccess, steps])
}

export type FinishLabAttemptCallback = (labId: string) => void;
export const useFinishLabAttempt = (): FinishLabAttemptCallback => {
	const dispatch = useDispatch();
	const isFinishingLabAttempt = useLoading([finishLabAttemptThunk]);
	const finishLabAttemptStatus = useFinishLabAttemptStatus();
	const {showToast} = useLoadingToast({
		loading: isFinishingLabAttempt,
		loadingMessage: 'Finishing attempt.',
		successMessage: 'Finishing lab attempt successfully',
		errorMessage: 'Failed to finish lab attempt',
		status: finishLabAttemptStatus
	})

	return useCallback((labId) => {
		showToast();
		dispatch(finishLabAttempt({labId}));
	}, [showToast, dispatch]);
}

export const useFinishLabAttemptStatus = (): ResponseStatus | null => useAppSelector(finishLabAttemptStatusSelector);