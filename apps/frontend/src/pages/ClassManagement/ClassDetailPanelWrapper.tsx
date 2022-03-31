import Box from '@mui/material/Box';
import Collapse, { CollapseProps } from '@mui/material/Collapse';
import React, { PropsWithChildren } from 'react';

export interface ClassDetailPanelWrapperProps extends CollapseProps {
  open: boolean;
}

const ClassDetailPanelWrapper: React.FC<
  PropsWithChildren<ClassDetailPanelWrapperProps>
> = (props) => {
  const { children, open } = props;

  return (
    <Collapse orientation="horizontal" in={open}>
      <Box
        sx={{
          width: (theme) => theme.spacing(100),
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Collapse>
  );
};

export default React.memo(ClassDetailPanelWrapper);
