import { styled } from '@mui/material/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppCommonRoute } from 'shared/constants';
import { Logo } from '../Logo';
import { LOGO_SIZE } from './AppBar.constants';

const StyledLink = styled(Link)(({ theme }) => ({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
}));

const AppBarLogo: React.FC = () => {
  return (
    <StyledLink to={AppCommonRoute.Root}>
      <Logo size={LOGO_SIZE} />
    </StyledLink>
  );
};

export default AppBarLogo;
