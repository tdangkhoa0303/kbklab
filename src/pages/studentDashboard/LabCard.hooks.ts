import {useMemo} from 'react';
import {Step} from 'shared/models';

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