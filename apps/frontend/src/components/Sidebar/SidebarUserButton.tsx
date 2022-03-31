import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { userRoleTextMap } from 'shared/constants';
import { useUser } from 'shared/hooks';
import { User } from 'shared/models';

const mockAvatarUrl =
  'https://play-lh.googleusercontent.com/kgSwHEst2ENqeYoasBoxvUcPD97c0RdIUxRYy6KlMUjiWlwzvPqg4ZSNGrweAps_g7c';

const UserButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.grey[200],
}));

const SidebarUserButton: React.FC = () => {
  const userInfo = useUser() as User;

  return (
    <Box sx={{ mb: 5, mx: 2.5 }}>
      <UserButtonContainer>
        <Avatar src={mockAvatarUrl} alt="photoURL" />
        <Box sx={{ ml: 2 }}>
          <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
            {userInfo.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {userRoleTextMap[userInfo.role]}
          </Typography>
        </Box>
      </UserButtonContainer>
    </Box>
  );
};

export default React.memo(SidebarUserButton);
