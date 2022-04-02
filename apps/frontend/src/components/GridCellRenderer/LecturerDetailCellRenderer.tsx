import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import {ICellRendererParams} from 'ag-grid-community';
import {cssLayout} from 'components';
import React from 'react';

const LecturerDetailCellRenderer: React.FC<ICellRendererParams> = (props) => {
  return (
    <Box
      display="flex"
      sx={{
        ...cssLayout.centerCenter,
        height: '100%',
      }}
    >
      <ArrowForwardIosIcon sx={{ fontSize: (theme) => theme.spacing(2) }} />
    </Box>
  );
};

export default React.memo(LecturerDetailCellRenderer);
