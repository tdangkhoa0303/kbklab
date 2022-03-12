import Box from '@mui/material/Box';
import React from 'react';
import LecturersGrid from './LecturersGrid';

const LecturerManagement: React.FC = () => {

	return (
		<Box
			display="flex"
			flexGrow={2}
			flexDirection="column"
		>
			<LecturersGrid />
		</Box>
	)
}

export default React.memo(LecturerManagement);
