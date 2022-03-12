import React, { useMemo } from 'react';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineDot, { TimelineDotProps } from '@mui/lab/TimelineDot';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import LabStepsItemContent from './LabStepsItemContent';
import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export interface LabStepsItemProps {
	subTitle: string;
	description: string;
	isTail: boolean;
	isDone: boolean;
}

const LabStepsItem: React.FC<LabStepsItemProps> = (props) => {
	const { subTitle, description, isTail, isDone } = props;
	const dotProps = useMemo(
		(): Partial<TimelineDotProps> => ({
			variant: isDone ? 'filled' : 'outlined',
		}),
		[isDone]
	);

	return (
		<TimelineItem
			sx={{
				'&:before': {
					display: 'none',
				},
			}}
		>
			<TimelineSeparator>
				<TimelineDot
					{...dotProps}
					sx={{
						padding: 0.5,
						backgroundColor: isDone
							? (theme) => theme.palette.common.green
							: 'transparent',
						boxShadow: 'none',
						margin: (theme) => theme.spacing(1.5, 0),
					}}
				>
					{isDone ? (
						<CheckIcon
							sx={{
								width: (theme) => theme.spacing(3),
								height: (theme) => theme.spacing(3),
							}}
						/>
					) : (
						<MoreHorizIcon
							color="disabled"
							sx={{
								width: (theme) => theme.spacing(3),
								height: (theme) => theme.spacing(3),
							}}
						/>
					)}
				</TimelineDot>
				{!isTail && (
					<TimelineConnector
						sx={{
							width: '2px',
							height: (theme) => theme.spacing(6),
							backgroundColor: isDone
								? (theme) => theme.palette.common.green
								: '',
						}}
					/>
				)}
			</TimelineSeparator>
			<TimelineContent sx={{ padding: (theme) => theme.spacing(1.5) }}>
				<LabStepsItemContent subTitle={subTitle} description={description} />
			</TimelineContent>
		</TimelineItem>
	);
};

export default React.memo(LabStepsItem);
