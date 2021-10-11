import React from 'react';
import {Lab} from 'shared/models';
import {LabStatus} from 'shared/constants';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LabCardStatus from './LabCardStatus';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import isNull from 'lodash/isNull';

export interface LabCardViewProps {
	lab: Lab,
	score: number | null;
	status: LabStatus,
	onClick: VoidFunction,
	onAttempt: React.MouseEventHandler<HTMLButtonElement>
}

const LabCardView: React.FC<LabCardViewProps> = (props) => {
	const {lab, status, onAttempt, onClick, score} = props;
	const {title, description} = lab;

	return (
		<Card
			onClick={onClick}
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
				<Box display="flex" alignItems="center" mb={1}>
					<LabCardStatus status={status} />
					<Typography variant="body1" ml={1}>
						{status} {!isNull(score) && `- Score: ${score}`}
					</Typography>
				</Box>
				<Typography variant="body1">
					{description}
				</Typography>
			</CardContent>
			<CardActions>
				<Button
					onClick={onAttempt}
					endIcon={<ArrowForwardIcon />}
				>
					Attempt
				</Button>
			</CardActions>
		</Card>
	)
}

export default React.memo(LabCardView);