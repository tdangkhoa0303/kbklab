import Box from '@mui/material/Box';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import { cssLayout } from 'components';

const LecturerClassesCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const {} = props;

  return (
    <Box
      display="flex"
      sx={{
        ...cssLayout.centerCenter,
        height: '100%',
      }}
    >
      Hello
    </Box>
  );
};

export default React.memo(LecturerClassesCellRenderer);
