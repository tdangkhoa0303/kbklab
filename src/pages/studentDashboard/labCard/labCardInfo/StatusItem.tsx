import React from 'react';
import Typography from '@mui/material/Typography';
import LabCardInfoItem from './LabCardInfoItem';
import {LabStatus} from '../../../../shared/constants';
import LabCardStatus from './LabCardStatus';
import Box from '@mui/material/Box';

export interface StatusItemProps {
	status: LabStatus
}

const StatusItem: React.FC<StatusItemProps> = (props) => {
	const {status} = props;
	return (
		<LabCardInfoItem title="Status">
			<Box display="flex" alignItems="center">
				<LabCardStatus status={status} />
				<Typography variant="body1" ml={1}>
					{status}
				</Typography>
			</Box>
		</LabCardInfoItem>
	)
}

export default React.memo(StatusItem);