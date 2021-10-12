import React, {useCallback, useMemo, useRef} from 'react';
import {Lab} from 'shared/models';
import LabCardView from './LabCard.view';
import {getLabStatus} from './LabCard.utils';
import {useCreateLabInstance} from '../StudentDashboard.hooks';
import {useLabScore} from './LabCard.hooks';
import {ModalRef} from './LabStepsModal';

export interface LabCardContainerProps {
	lab: Lab,
}

const LabCardContainer: React.FC<LabCardContainerProps> = (props) => {
	const {lab} = props;
	const modalRef = useRef<ModalRef>(null);
	const {url: instanceUrl, stepSuccess, steps, labId} = lab;
	const labStatus = useMemo(() => getLabStatus(!!stepSuccess, instanceUrl), [instanceUrl, stepSuccess]);
	const labScore = useLabScore(steps, stepSuccess);
	const createLabInstance = useCreateLabInstance();

	const handleAttemptLab: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
		event.stopPropagation();
		if(instanceUrl) {
			return window.open(instanceUrl, '_blank');
		}

		return createLabInstance(labId)
		// Only wanna update when instanceUrl or labId is changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [instanceUrl, labId]);
	
	const handleClickOnLab = useCallback(() => {
		if(modalRef && modalRef.current) {
			modalRef.current.openModal();
		}
	}, [])

	return (
		<LabCardView
			lab={lab}
			score={labScore}
			status={labStatus}
			modalRef={modalRef}
			onClick={handleClickOnLab}
			onAttempt={handleAttemptLab}
		/>
	)
}

export default React.memo(LabCardContainer);