import Box from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import React, {PropsWithChildren} from 'react';
import {AppBar} from '../AppBar';
import Sidebar from '../Sidebar/Sidebar';

export interface MasterLayoutProps {
  appBarContent?: React.ReactElement;
}

const MainStyle = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  display: 'flex',
  height: '100vh',
  overflow: 'hidden',
  paddingBottom: theme.spacing(2),
  paddingTop: theme.spacing(12.5),
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
}));

const MasterLayout: React.FC<PropsWithChildren<MasterLayoutProps>> = (
  props
) => {
  const { appBarContent, children } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100%',
        overflow: 'hidden',
      }}
    >
      <AppBar>{appBarContent}</AppBar>
      <Sidebar />
      <MainStyle>{children}</MainStyle>
    </Box>
  );
};

export default React.memo(MasterLayout);
