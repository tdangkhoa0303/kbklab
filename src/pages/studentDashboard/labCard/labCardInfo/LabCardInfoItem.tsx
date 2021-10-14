import React, {PropsWithChildren} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface LabCardInfoItemProps {
	title: string
}

const LabCardInfoItem: React.FC<PropsWithChildren<LabCardInfoItemProps>> = (props) => {
	const {title, children} = props;

	return (
		<Box
			display="flex"
			flexDirection="column"
			justifyContent="flex-start"
		>
			<Typography
				variant="subtitle2"
				mb={2}
				sx={{
					color: '#838f9b',
					textTransform: 'uppercase',
				}}
			>
				{title}
			</Typography>
			{children}
		</Box>
	)
}

export default React.memo(LabCardInfoItem);