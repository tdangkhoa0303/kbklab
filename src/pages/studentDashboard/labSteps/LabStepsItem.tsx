import React, {useMemo} from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot, {TimelineDotProps} from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import LabStepsItemContent from './LabStepsItemContent';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export interface LabStepsItemProps {
	point: number,
	description: string,
	isTail: boolean,
	isDone: boolean
}

const LabStepsItem: React.FC<LabStepsItemProps> = (props) => {
	const {point, description, isTail, isDone} = props;
	const dotProps = useMemo((): Partial<TimelineDotProps> => ({
		variant: isDone ? 'filled' : 'outlined',
		color: isDone ? 'success' : undefined
	}), [isDone])

	return (
		<TimelineItem>
			<TimelineSeparator>
				<TimelineDot
					{...dotProps}
					sx={{
						padding: 1.5,
					}}
				>
					{isDone ? <DoneAllIcon /> : <HourglassEmptyIcon color="disabled" />}
				</TimelineDot>
				{!isTail && <TimelineConnector sx={{height: theme => theme.spacing(5)}} />}
			</TimelineSeparator>
			<TimelineContent>
				<LabStepsItemContent
					point={point}
					description={description}
				/>
			</TimelineContent>
		</TimelineItem>
	)
}

export default React.memo(LabStepsItem);