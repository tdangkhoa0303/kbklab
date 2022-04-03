import Box from '@mui/material/Box';
import {PageTitle} from 'components';
import React from 'react';
import LabsGrid from './LabsGrid.container';

const LabDashboard: React.FC = () => {
  return (
    <Box display="flex" flexGrow={2} flexDirection="column">
      <PageTitle title="Student Labs" />
      <LabsGrid />
    </Box>
  );
};

export default React.memo(LabDashboard);
