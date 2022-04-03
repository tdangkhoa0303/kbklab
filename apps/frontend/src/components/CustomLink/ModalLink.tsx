import Box from '@mui/material/Box';
import React from 'react';
import {Link, LinkProps, useLocation} from 'react-router-dom';

export type ModalLinkProps = LinkProps;

const ModalLink: React.FC<ModalLinkProps> = (props) => {
  const location = useLocation();

  return (
    <Box
      {...props}
      component={Link}
      state={{background: location}}
      sx={{textDecoration: 'none'}}
    />
  )
};

export default React.memo(ModalLink);
