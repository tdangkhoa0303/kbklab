import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import {Step} from 'shared/models';
import LabCardInfoItem from './LabCardInfoItem';

export interface StepsItemProps {
	steps: Step[];
}

const StepsItem: React.FC<StepsItemProps> = (props) => {
	const { steps } = props;

	return (
		<LabCardInfoItem title="Steps">
			<Box display="flex" alignItems="center">
				<LibraryAddCheckIcon
					sx={{ color: (theme) => theme.palette.common.spaceGrey }}
				/>
				<Typography ml={1}>{steps.length}</Typography>
			</Box>
		</LabCardInfoItem>
	);
};

export default React.memo(StepsItem);
