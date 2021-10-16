import React, {MouseEventHandler, RefObject} from 'react';
import {Lab} from 'shared/models';
import {LabStatus} from 'shared/constants';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LabCardInfo from './labCard/LabCardInfo';
import Grid from '@mui/material/Grid';
import LabStepsModal, {ModalRef} from './labCard/LabStepsModal';

export interface LabCardViewProps {
	lab: Lab,
	status: LabStatus,
	finishLabAttempt: MouseEventHandler<HTMLButtonElement>,
	handleShowStep: VoidFunction,
	modalRef: RefObject<ModalRef>,
	isCreatingLabInstance: boolean,
	onAttempt: React.MouseEventHandler<HTMLButtonElement>
}

const LabCardView: React.FC<LabCardViewProps> = (props) => {
	const {lab, onAttempt, status, modalRef, handleShowStep, finishLabAttempt, isCreatingLabInstance} = props;
	const {title, description, stepSuccess, steps, url: instanceUrl} = lab;

	return (
		<>
			<Card
				onClick={handleShowStep}
				sx={{
					boxShadow: theme => theme.boxShadow.main,
					padding: 1,
					borderRadius: 2,
					cursor: 'pointer'
				}}
			>
				<CardContent>
					<Typography variant="h5" mb={2}>
						{title}
					</Typography>
					<Typography variant="body1" mb={2}>
						{description}
					</Typography>
					<LabCardInfo
						steps={steps}
						status={status}
						stepSuccess={stepSuccess}
					/>
				</CardContent>
				<CardActions>
					<Grid container spacing={2}>
						<Grid item xs={2} md={6}>
							<Button
								fullWidth
								disabled={isCreatingLabInstance}
								variant="outlined"
								onClick={onAttempt}
								endIcon={<ArrowForwardIcon />}
							>
								Attempt
							</Button>
						</Grid>
						<Grid item xs={2} md={6}>
							{instanceUrl && (
								<Button
									fullWidth
									variant="contained"
									onClick={finishLabAttempt}
								>
									Finish Attempt
								</Button>
							)}
						</Grid>
					</Grid>
				</CardActions>
			</Card>
			<LabStepsModal
				steps={steps}
				ref={modalRef}
				stepSuccess={stepSuccess}
			/>
		</>
	)
}

export default React.memo(LabCardView);