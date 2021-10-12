import React from 'react';
import Typography from '@mui/material/Typography';

export interface LabStepsItemContentProps {
	point: number,
	description: string,
}

const LabStepsItemContent: React.FC<LabStepsItemContentProps> = (props) => {
	const {point, description} = props;

	return (
		<>
			<Typography
				mb={1}
				sx={{color: '#333333', fontWeight: 500, fontSize: theme => theme.spacing(2.5)}}
			>
				{description}
			</Typography>
			<Typography variant="body1">
				{point} {point > 1 ? 'points' : 'point'}
			</Typography>
		</>
	)
}

export default React.memo(LabStepsItemContent);