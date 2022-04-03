import Box from '@mui/material/Box';
import {ICellRendererParams} from 'ag-grid-community';
import {cssLayout} from 'components';
import React from 'react';

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
