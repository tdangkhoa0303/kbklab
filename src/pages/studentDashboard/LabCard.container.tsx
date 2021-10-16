import React, {useCallback, useMemo, useRef} from 'react';
import {Lab} from 'shared/models';
import LabCardView from './LabCard.view';
import {getLabStatus} from './LabCard.utils';
import {useCreateLabInstance, useIsCreatingLabInstance} from '../StudentDashboard.hooks';
import {useFinishLabAttempt} from './LabCard.hooks';
import {ModalRef} from './labCard/LabStepsModal';
import {ShowToastCallback} from '../../shared/hooks/useLoadingToast';

export interface LabCardContainerProps {
	lab: Lab,
	onAttempt: ShowToastCallback,
}

const LabCardContainer: React.FC<LabCardContainerProps> = (props) => {
	const {lab, onAttempt} = props;
	const {url: instanceUrl, stepSuccess, labId} = lab;
	const modalRef = useRef<ModalRef>(null);
	const isCreatingLabInstance = useIsCreatingLabInstance();
	const labStatus = useMemo(() => getLabStatus(!!stepSuccess, instanceUrl), [instanceUrl, stepSuccess]);
	const createLabInstance = useCreateLabInstance();
	const finishLabAttempt = useFinishLabAttempt();

	const handleShowStep = useCallback(() => {
		if(modalRef && modalRef.current) {
			modalRef.current.openModal();
		}
	}, [])

	const handleAttemptLab: React.MouseEventHandler<HTMLButtonElement> = useCallback((event) => {
		event.stopPropagation();
		if(instanceUrl) {
			return window.open(instanceUrl, '_blank');
		}

		onAttempt();
		return createLabInstance(labId)
		// Only wanna update when instanceUrl or labId is changed
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [instanceUrl, labId]);

	const handleFinishLabAttempt = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		finishLabAttempt(labId);
	}, [finishLabAttempt, labId])

	return (
		<LabCardView
			lab={lab}
			status={labStatus}
			modalRef={modalRef}
			handleShowStep={handleShowStep}
			onAttempt={handleAttemptLab}
			isCreatingLabInstance={isCreatingLabInstance}
			finishLabAttempt={handleFinishLabAttempt}
		/>
	)
}

export default React.memo(LabCardContainer);