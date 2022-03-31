import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import React from 'react';

const ClassesGridActions: React.FC = () => {
  return (
    <Box>
      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export default React.memo(ClassesGridActions);
