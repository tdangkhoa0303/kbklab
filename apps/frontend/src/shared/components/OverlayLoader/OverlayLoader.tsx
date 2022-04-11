import Box, {BoxProps} from '@mui/material/Box';
import {styled} from '@mui/material/styles';
import React, {PropsWithChildren} from 'react';
import {HashLoader} from 'react-spinners';

export interface OverlayLoaderProps extends BoxProps {
  loading: boolean;
}

const StyledBox = styled(Box)(({theme}) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.white,
}))

const OverlayLoader: React.FC<PropsWithChildren<OverlayLoaderProps>> = (
  props
) => {
  const {loading, children, ...boxProps} = props;

  return (
    loading ? (
      <StyledBox
        display="flex"
        alignItems="center"
        justifyContent="center"
        {...boxProps}
      >
        <HashLoader size={80} color="#00AB55" />
      </StyledBox>
    ) : (
      <>{children}</>
    )
  );
};

export default React.memo(OverlayLoader);
