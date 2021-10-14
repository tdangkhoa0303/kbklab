import React from 'react';
import Box from '@mui/material/Box';
import GradeIcon from '@mui/icons-material/Grade';
import Typography from '@mui/material/Typography';
import {EMPTY_INFO_TEXT} from '../../LabCard.constants';
import LabCardInfoItem from './LabCardInfoItem';

export interface ScoreItemProps {
	score: number | null
}

const ScoreItem: React.FC<ScoreItemProps> = (props) => {
	const {score} = props;
	return (
		<LabCardInfoItem title="Score">
			<Box display="flex" alignItems="center">
				<GradeIcon sx={{color: theme => theme.palette.common.yellow}} />
				<Typography ml={1}>
					{score || EMPTY_INFO_TEXT}
				</Typography>
			</Box>
		</LabCardInfoItem>
	)
}

export default React.memo(ScoreItem);