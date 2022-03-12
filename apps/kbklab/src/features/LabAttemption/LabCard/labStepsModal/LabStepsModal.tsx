import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {Modal, ModalRef} from 'components';
import React, {RefObject, useCallback} from 'react';
import ReactMarkdown from 'react-markdown';
import {ClassLab} from 'shared/models';
import LabSteps from './LabSteps';

export interface LabStepsModalProps {
	modalRef: RefObject<ModalRef>;
	classLab: ClassLab;
}

const ScrollableGridItem = styled(Grid)({
	height: '100%',
	overflow: 'auto',
})

const LabStepsModal: React.FC<LabStepsModalProps> = (props) => {
	const {modalRef, classLab} = props;
	const {
		lab: {
			steps,
			guide,
			title,
			description
		},
		stepSuccess,
		startDate,
		endDate
	} = classLab;
	const onOk = useCallback(() => {
		if (modalRef.current) {
			modalRef.current.close();
		}
	}, [modalRef]);

	return (
		<Modal
			hideSecondaryButton
			modalRef={modalRef}
			title={title}
			primaryButtonText="Got It!!"
			primaryButtonProps={{
				onClick: onOk,
			}}
		>
			<Box
				display="flex"
				flexDirection="column"
				sx={{width: theme => theme.spacing(140)}}
			>
				<Typography mb={2} sx={{fontSize: theme => theme.spacing(2.5)}}>
					{description}
				</Typography>
				<Grid
					container
					spacing={2}
					pb={1}
					sx={{
						background: theme => theme.palette.common.white,
						zIndex: 2
					}}
				>
					<Grid item sm={6}>
						<Typography
							color="primary"
							variant="h6"
							sx={{fontSize: theme => `${theme.spacing(2)} !important`}}
						>
							GUIDE
						</Typography>
					</Grid>
					<Grid item sm={6} sx={{overflow: 'auto'}}>
						<Typography
							color="primary"
							variant="h6"
							sx={{fontSize: theme => `${theme.spacing(2)} !important`}}
						>
							STEPS
						</Typography>
					</Grid>
				</Grid>
				<Grid
					container
					spacing={2}
					sx={{
						height: theme => theme.spacing(65),
						overflow: 'hidden'
					}}
				>
					<ScrollableGridItem item sm={6}>
						<ReactMarkdown>
							{guide}
						</ReactMarkdown>
					</ScrollableGridItem>
					<ScrollableGridItem item sm={6}>
						<LabSteps
							steps={steps}
							stepSuccess={stepSuccess}
							startDate={startDate}
							endDate={endDate}
						/>
					</ScrollableGridItem>
				</Grid>
			</Box>
		</Modal>
	);
};

export default React.memo(LabStepsModal);
