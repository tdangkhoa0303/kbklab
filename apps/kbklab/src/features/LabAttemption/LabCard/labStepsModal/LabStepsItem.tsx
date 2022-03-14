import CheckIcon from '@mui/icons-material/Check';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot, {TimelineDotProps} from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {deepOrange, red} from '@mui/material/colors';
import {useTheme} from '@mui/material/styles';
import React, {useMemo} from 'react';
import LabStepsItemContent from './LabStepsItemContent';

export interface LabStepsItemProps {
	subTitle: string;
	description: string;
	isTail: boolean;
	isDone: boolean;
  isClosed: boolean;
}

const LabStepsItem: React.FC<LabStepsItemProps> = (props) => {
	const { subTitle, description, isTail, isDone, isClosed} = props;
  const theme = useTheme();

	const dotProps = useMemo(
		(): Partial<TimelineDotProps> => ({
			variant: (isDone || isClosed) ? 'filled' : 'outlined',
		}),
		[isClosed, isDone]
	);

  const dotColor = useMemo(() => {
    if(isClosed && !isDone) {
      return red[500];
    }

    return isDone ? theme.palette.common.green : 'transparent'
  }, [isClosed, isDone, theme.palette.common.green])

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
						backgroundColor: dotColor,
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
							sx={{
								width: (theme) => theme.spacing(3),
								height: (theme) => theme.spacing(3),
                color: (isClosed && !isDone) ? '#ffffff' : theme.palette.grey[400]
              }}
						/>
					)}
				</TimelineDot>
				{!isTail && (
					<TimelineConnector
						sx={{
							width: '2px',
							height: (theme) => theme.spacing(6),
							backgroundColor: dotColor,
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
