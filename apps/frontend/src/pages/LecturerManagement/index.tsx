import Box from '@mui/material/Box';
import React from 'react';
import {useMounting} from 'shared/hooks';
import LecturersGrid from './LecturersGrid';
import {useGetAllLecturers} from './LecturersGrid.hooks';

const LecturerManagement: React.FC = () => {
  const getAllLecturers = useGetAllLecturers();

  useMounting(() => getAllLecturers())

  return (
    <Box display="flex" flexGrow={2} flexDirection="column">
      <LecturersGrid />
    </Box>
  );
};

export default React.memo(LecturerManagement);
