import Box from '@mui/material/Box';
import React, {PropsWithChildren, useCallback} from 'react';
import {To, useLocation, useNavigate} from 'react-router-dom';

export type ModalLinkProps = {to: To};

const ModalLink: React.FC<PropsWithChildren<ModalLinkProps>> = ({to, children}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate(to, {
      state: {background: location}
    })
  }, [location, navigate, to])

  return (
    <Box onClick={handleNavigate}>
      {children}
    </Box>
  )
};

export default React.memo(ModalLink);
