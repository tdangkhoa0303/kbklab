import Box from '@mui/material/Box';
import {useTheme} from '@mui/material/styles';
import React, {PropsWithChildren} from 'react';
import {HashLoader} from 'react-spinners';

export interface OverlayLoaderProps {
  loading: boolean;
}

const OverlayLoader: React.FC<PropsWithChildren<OverlayLoaderProps>> = (
  props
) => {
  const {loading, children} = props;
  const theme = useTheme();

  return (
    loading ? (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: theme.palette.common.white,
        }}
      >
        <HashLoader size={80} color="#00AB55" />
      </Box>
    ) : (
      <>{children}</>
    )
  );
};

export default React.memo(OverlayLoader);
