import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';
import {LabStatus} from 'shared/constants';
import LabCardInfoItem from './LabCardInfoItem';
import LabCardStatus from './LabCardStatus';

export interface StatusItemProps {
  status: LabStatus;
}

const StatusItem: React.FC<StatusItemProps> = (props) => {
  const { status } = props;
  return (
    <LabCardInfoItem title="Status">
      <Box display="flex" alignItems="center">
        <Box flexShrink={0}>
          <LabCardStatus status={status} />
        </Box>
        <Typography variant="body1" ml={1} sx={{ whiteSpace: 'nowrap' }}>
          {status}
        </Typography>
      </Box>
    </LabCardInfoItem>
  );
};

export default React.memo(StatusItem);
