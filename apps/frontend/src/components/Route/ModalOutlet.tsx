import {Icon} from '@iconify/react';
import {Container} from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import {useTheme} from '@mui/material/styles';
import React, {useCallback} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';

const ModalOutlet: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const onClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal
      open={true}
      hideBackdrop={true}
      sx={{
        outline: 'none',
        overflow: 'auto',
        backgroundColor: 'rgba(51, 51, 51, 0.8)',
      }}
    >
      <>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'fixed',
            top: theme.spacing(1),
            right: theme.spacing(1),
            color: theme.palette.common.white
          }}
        >
          <Icon
            width={24}
            height={24}
            icon="eva:close-fill"
          />
        </IconButton>
        <Container
          maxWidth="xl"
          sx={{
            minHeight: '100vh',
            boxSizing: 'border-box',
            height: 'fit-content',
            outline: 'none',
            padding: theme.spacing(6, 0),
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box sx={{
            flexGrow: 2,
            minHeight: '100%',
            height: 'fit-content',
            position: 'relative',
            padding: `${theme.spacing(0, 2.5)} !important`,
            borderRadius: theme.spacing(2),
            background: theme.palette.common.white,
            overflow: 'hidden'
          }}>
            <Outlet />
          </Box>
        </Container>
      </>
    </Modal>
  );
};

export default React.memo(ModalOutlet);
