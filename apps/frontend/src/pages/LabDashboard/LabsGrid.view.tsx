import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LabCard from 'components/LabAttemption/LabCard/LabCard.container';
import React from 'react';
import {ClassLab} from 'shared/models';

export interface LabsGridViewProps {
  classLabs: ClassLab[];
}

const LabsGridView: React.FC<LabsGridViewProps> = (props) => {
  const {classLabs} = props;

  return (
    <Box position="relative" overflow="auto">
      <Grid container spacing={4} p={2}>
        {classLabs.map((classLab) => (
          <Grid item xs={12} md={6} lg={4} key={classLab.id}>
            <LabCard isStudent classLab={classLab} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default React.memo(LabsGridView);
