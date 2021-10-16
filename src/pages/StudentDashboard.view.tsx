import React from 'react';
import Box from '@mui/material/Box';
import {Lab} from 'shared/models';
import {ShowToastCallback} from '../shared/hooks/useLoadingToast';
import Grid from '@mui/material/Grid';
import LabCard from './studentDashboard/LabCard.container';

export interface StudentDashboardViewProps {
	labs: Lab[],
	onAttempt: ShowToastCallback,
}

const StudentDashboardView: React.FC<StudentDashboardViewProps> = (props) => {
	const {labs, onAttempt} = props;

	return (
		<Box>
			<Grid container spacing={4}>
				{labs.map((lab) => (
					<Grid item xs={6} lg={4} xl={3} key={lab.labId}>
						<LabCard lab={lab} onAttempt={onAttempt} />
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

export default React.memo(StudentDashboardView);