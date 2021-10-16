import React from 'react';
import {LabStatus} from 'shared/constants';
import {Step} from 'shared/models';
import Grid from '@mui/material/Grid';
import StatusItem from './labCardInfo/StatusItem';
import StepsItem from './labCardInfo/StepsItem';
import ScoreItem from './labCardInfo/ScoreItem';
import {useLabScore} from '../LabCard.hooks';

export interface LabCardInfoItemProps {
	status: LabStatus,
	steps: Step[],
	stepSuccess?: boolean[]
}

const LabCardInfo: React.FC<LabCardInfoItemProps> = (props) => {
	const {status, steps, stepSuccess} = props;
	const labScore = useLabScore(steps, stepSuccess);

	return (
		<Grid container spacing={2}>
			<Grid item xs={4}>
				<StatusItem status={status} />
			</Grid>
			<Grid item xs={4}>
				<StepsItem steps={steps} />
			</Grid>
			<Grid item xs={4}>
				<ScoreItem score={labScore} />
			</Grid>
		</Grid>
	)
}

export default React.memo(LabCardInfo);