import React, {useCallback, useRef} from 'react';
import Box from '@mui/material/Box';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Typography from '@mui/material/Typography';
import LabCardInfoItem from './LabCardInfoItem';
import {Step} from 'shared/models';
import LabStepsModal, {ModalRef} from './StepItem/LabStepsModal';

export interface StepsItemProps {
	steps: Step[],
	stepSuccess?: boolean[],
}

const StepsItem: React.FC<StepsItemProps> = (props) => {
	const {steps, stepSuccess} = props;
	const modalRef = useRef<ModalRef>(null);

	const handleShowStep = useCallback(() => {
		if(modalRef && modalRef.current) {
			modalRef.current.openModal();
		}
	}, [])

	return (
		<LabCardInfoItem title="Steps">
			<Box onClick={handleShowStep} display="flex" alignItems="center">
				<LibraryAddCheckIcon sx={{color: theme => theme.palette.common.spaceGrey}} />
				<Typography ml={1}>
					{steps.length}
				</Typography>
				<LabStepsModal
					steps={steps}
					ref={modalRef}
					stepSuccess={stepSuccess}
				/>
			</Box>
		</LabCardInfoItem>
	)
}

export default React.memo(StepsItem);