import React, {useCallback, useMemo} from 'react';
import {Lab} from 'shared/models';
import LabCardView from './LabCard.view';
import {getLabStatus} from './LabCard.utils';
import {useCreateLabInstance} from '../StudentDashboard.hooks';
import {useFinishLabAttempt} from './LabCard.hooks';

export interface LabCardContainerProps {
	lab: Lab,
}

const LabCardContainer: React.FC<LabCardContainerProps> = (props) => {
	const {lab} = props;
	const {url: instanceUrl, stepSuccess, labId} = lab;
	const labStatus = useMemo(() => getLabStatus(!!stepSuccess, instanceUrl), [instanceUrl, stepSuccess]);
	const createLabInstance = useCreateLabInstance();
	const finishLabAttempt = useFinishLabAttempt();

	const handleAttemptLab: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
		event.stopPropagation();
		if(instanceUrl) {
			return window.open(instanceUrl, '_blank');
		}

		return createLabInstance(labId)
		// Only wanna update when instanceUrl or labId is changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [instanceUrl, labId]);

	const handleFinishLabAttempt = useCallback(() => finishLabAttempt(labId), [finishLabAttempt, labId])

	return (
		<LabCardView
			lab={lab}
			status={labStatus}
			onAttempt={handleAttemptLab}
			finishLabAttempt={handleFinishLabAttempt}
		/>
	)
}

export default React.memo(LabCardContainer);