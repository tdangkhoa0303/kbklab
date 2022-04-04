import {Icon} from '@iconify/react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import React, {useCallback} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';

const ModalOutlet: React.FC = () => {
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal
      open={true}
      hideBackdrop={true}
      sx={{
        outline: 'none',
        backgroundColor: 'rgba(51, 51, 51, 0.4)',
        padding: theme => theme.spacing(6)
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        sx={{
          position: 'relative',
          minHeight: '100%',
          height: 'fit-content',
          padding: theme => theme.spacing(2.5),
          borderRadius: theme => theme.spacing(1),
          background: theme => theme.palette.common.white,
          outline: 'none',
      }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: theme => theme.spacing(1),
            right: theme => theme.spacing(1),
          }}
        >
          <Icon
            width={24}
            height={24}
            icon="eva:close-fill"
          />
        </IconButton>
        <Box
          sx={{
            width: '100%',
            background: (theme) => theme.palette.common.white,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Modal>
  );
};

export default React.memo(ModalOutlet);
