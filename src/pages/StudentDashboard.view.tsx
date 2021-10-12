import React from 'react';
import Box from '@mui/material/Box';
import LabList from './studentDashboard/LabList';
import {Lab} from 'shared/models';

export interface StudentDashboardViewProps {
	inProgressLabs: Lab[],
	archivedLabs: Lab[]
}

const StudentDashboardView: React.FC<StudentDashboardViewProps> = (props) => {
	const {inProgressLabs, archivedLabs} = props;

	return (
		<Box>
			<LabList title="In Progress Labs" data={inProgressLabs} />
			<LabList title="Archived Labs" data={archivedLabs} />
		</Box>
	)
}

export default React.memo(StudentDashboardView);