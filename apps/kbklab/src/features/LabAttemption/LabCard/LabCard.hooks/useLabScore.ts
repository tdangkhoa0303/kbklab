import {useMemo} from 'react';
import {Step} from 'shared/models';

export const getLabScore = (steps: Step[], stepSuccess?: boolean[][]): number | null => {
	const latestStepSuccess = stepSuccess ? stepSuccess[stepSuccess.length - 1] : null;

	if (!latestStepSuccess) {
		return null;
	}

	return steps.reduce((totalScore, step, index) => {
		return totalScore + (latestStepSuccess[index] ? step.point : 0);
	}, 0)
}

export const useLabScore = (steps: Step[], stepSuccess?: boolean[][]) => {
	return useMemo(() => getLabScore(steps, stepSuccess), [stepSuccess, steps]);
};
