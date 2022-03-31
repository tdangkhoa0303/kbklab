import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import React, { useCallback } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

const ModalOutlet: React.FC = () => {
  const navigate = useNavigate();

  const onClose = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return (
    <Modal open={true}>
      <Box display="flex" flexDirection="column" alignItems="flex-end">
        <Icon width={16} height={16} onClick={onClose} icon="eva:close-fill" />
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
