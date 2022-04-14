import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {ICellRendererParams} from 'ag-grid-community';
import {cssLayout} from 'components';
import React, {useCallback} from 'react';
import {useSetCurrentDetailClassId} from '../ClassesGrid.hooks';

const ClassDetailCellRenderer: React.FC<ICellRendererParams> = (props) => {
  const { data } = props;
  const setCurrentDetailClassId = useSetCurrentDetailClassId();

  const onShowClassDetail = useCallback(() => {
    if (data && data.id) {
      setCurrentDetailClassId(data.id);
    }
  }, [setCurrentDetailClassId, data]);

  return (
    <Box
      display="flex"
      sx={{
        ...cssLayout.centerCenter,
        height: '100%',
      }}
    >
      <IconButton
        onClick={onShowClassDetail}>
        <ArrowForwardIosIcon sx={{ fontSize: (theme) => theme.spacing(2) }} />
      </IconButton>
    </Box>
  );
};

export default React.memo(ClassDetailCellRenderer);
