import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';
import { HashLoader } from 'react-spinners';

export interface OverlayLoaderProps {
  loading: boolean;
}

const OverlayLoader: React.FC<PropsWithChildren<OverlayLoaderProps>> = (
  props
) => {
  const { loading, children } = props;
  const theme = useTheme();

  return (
    <Box>
      {loading ? (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            backgroundColor: theme.palette.common.white,
          }}
        >
          <HashLoader size={80} color="#00AB55" />
        </Box>
      ) : (
        children
      )}
    </Box>
  );
};

export default React.memo(OverlayLoader);
