import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import React, {MouseEventHandler, useMemo} from 'react';
import {LabStatus} from 'shared/constants';
import {ClassLab} from 'shared/models';
import LabCardInfo from './LabCardInfo';

export interface LabCardViewProps {
	classLab: ClassLab;
	status: LabStatus;
	onFinish: MouseEventHandler<HTMLButtonElement>;
	handleShowStep: VoidFunction;
	isAttemptingLab: boolean;
	onAttempt: MouseEventHandler<HTMLButtonElement>;
	onEditClassLab: MouseEventHandler<HTMLButtonElement>;
	onDeleteClassLab: MouseEventHandler<HTMLButtonElement>;
	isStudent?: boolean;
}

const LabCardView: React.FC<LabCardViewProps> = (props) => {
	const {classLab, onAttempt, status, handleShowStep, onFinish, isAttemptingLab, onEditClassLab, isStudent, onDeleteClassLab} = props;
	const {
		lab: {steps, title, disabled},
		stepSuccess,
		url: instanceUrl,
		name,
		endDate,
		startDate,
	} = classLab;

	const shouldDisplayEditButton = useMemo(() => (
		!isStudent && moment().isBefore(endDate)
	), [endDate, isStudent]);

	const shouldDisplayDeleteButton = useMemo(() => (
		!isStudent && moment().isBefore(startDate)
	), [isStudent, startDate]);

	return (
		<Card
			onClick={handleShowStep}
			sx={{
				boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
				padding: 1,
				borderRadius: 2,
				cursor: 'pointer',
			}}
		>
			<CardContent sx={{padding: theme => theme.spacing(1)}}>
				<Typography variant="h5" fontWeight={500} mb={2}>
					{name || title}
				</Typography>
				<LabCardInfo steps={steps} status={status} stepSuccess={stepSuccess} />
				<Stack
					spacing={1}
					direction="row"
					sx={{
						position: 'absolute',
						top: theme => theme.spacing(1),
						right: theme => theme.spacing(1)
					}}
				>
					{shouldDisplayEditButton && (
						<Tooltip title="Edit Class Lab">
							<IconButton onClick={onEditClassLab}>
								<ModeEditIcon />
							</IconButton>
						</Tooltip>
					)}
					{shouldDisplayDeleteButton && (
						<Tooltip title="Delete Class Lab">
							<IconButton onClick={onDeleteClassLab}>
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					)}
				</Stack>

			</CardContent>
			<CardActions>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						{instanceUrl ? (
							<Button
								fullWidth
								disabled={isAttemptingLab || ![LabStatus.Open, LabStatus.InProgress].includes(status)}
								variant="outlined"
								component="a"
								href={instanceUrl}
								target="_blank"
								endIcon={<ArrowForwardIcon />}
							>
								Attempt
							</Button>
						) : (
							<Button
								fullWidth
								disabled={isAttemptingLab || ![LabStatus.Open, LabStatus.InProgress].includes(status) || disabled}
								variant="outlined"
								onClick={onAttempt}
								endIcon={<ArrowForwardIcon />}
							>
								Attempt
							</Button>
						)}

					</Grid>
					{instanceUrl && (
						<Grid item xs={6}>
							<Button fullWidth variant="contained" onClick={onFinish}>
								Finish Attempt
							</Button>
						</Grid>
					)}
				</Grid>
			</CardActions>
		</Card>
	);
};

export default React.memo(LabCardView);
