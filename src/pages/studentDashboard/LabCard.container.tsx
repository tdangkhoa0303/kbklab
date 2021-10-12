import React, {useCallback, useMemo} from 'react';
import {Lab} from 'shared/models';
import LabCardView from './LabCard.view';
import {getLabStatus} from './LabCard.utils';
import {useCreateLabInstance} from '../StudentDashboard.hooks';
import {useLabScore} from './LabCard.hooks';
import {ToastOptions} from 'react-toastify';

export interface LabCardContainerProps {
	lab: Lab,
	showLabSteps: (labId: string) => void,
	onCreatingInstance: (options?: ToastOptions) => void
}

const LabCardContainer: React.FC<LabCardContainerProps> = (props) => {
	const {lab, showLabSteps, onCreatingInstance} = props;
	const {url: instanceUrl, stepSuccess, steps, labId} = lab;
	const labStatus = useMemo(() => getLabStatus(!!stepSuccess, instanceUrl), [instanceUrl, stepSuccess]);
	const labScore = useLabScore(steps, stepSuccess);
	const createLabInstance = useCreateLabInstance();

	const handleAttemptLab: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
		event.stopPropagation();
		if(instanceUrl) {
			return window.open(instanceUrl, '_blank');
		}

		onCreatingInstance()
		return createLabInstance(labId)
		// Only wanna update when instanceUrl or labId is changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [instanceUrl, labId]);
	
	const handleClickOnLab = useCallback(() => showLabSteps(labId), [labId, showLabSteps])

	return (
		<LabCardView
			lab={lab}
			score={labScore}
			status={labStatus}
			onClick={handleClickOnLab}
			onAttempt={handleAttemptLab}
		/>
	)
}

export default React.memo(LabCardContainer);