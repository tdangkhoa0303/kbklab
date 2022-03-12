import Box from '@mui/material/Box';
import React from 'react';
import ClassesGrid from './ClassesGrid';

const LecturerManagement: React.FC = () => {

	return (
		<Box
			display="flex"
			flexGrow={2}
			flexDirection="column"
		>
			<ClassesGrid />
		</Box>
	)
}

export default React.memo(LecturerManagement);
