import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import {useLabField} from '../../../components/LabAttemption/LabCard/LabCard.context';
import {LabFieldDefinition} from '../../../components/LabAttemption/LabCard/LabCard.types';

const LabDetailItem: React.FC<LabFieldDefinition> = (props) => {
  const { name, path, component: Component, formatter } = props;
  const filedValue = useLabField(path);

  if (!filedValue) {
    return null;
  }

  return (
    <Box mt={1} mb={3}>
      <Typography
        variant="h6"
        sx={{
          fontSize: (theme) => theme.spacing(2.5),
          fontWeight: 550,
        }}
      >
        {name}:
      </Typography>
      {Component ? (
        <Component {...props} />
      ) : (
        <Typography variant="body1">
          {formatter ? formatter(filedValue) : filedValue}
        </Typography>
      )}
    </Box>
  );
};

export default React.memo(LabDetailItem);
