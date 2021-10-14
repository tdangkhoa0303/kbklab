import React from 'react';
import {Lab} from 'shared/models';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import LabCard from './LabCard.container';
import isEmpty from 'lodash/isEmpty';
import Box from '@mui/material/Box';

export interface LabListProps {
	data: Lab[],
	title: string
}

const LabList: React.FC<LabListProps> = (props) => {
	const {data, title} = props;
	if(isEmpty(data)) {
		return null;
	}

	return (
		<Box mb={4}>
			<Typography variant="h5" mb={3}>
				{title}
			</Typography>
			<Grid container spacing={4}>
				{data.map((lab) => (
					<Grid item xs={6} lg={4} xl={3} key={lab.labId}>
						<LabCard lab={lab} />
					</Grid>
				))}
			</Grid>
		</Box>
	)
}

export default React.memo(LabList);