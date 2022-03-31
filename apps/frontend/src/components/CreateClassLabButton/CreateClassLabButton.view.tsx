import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import Button from '@mui/material/Button';
import React from 'react';

export interface CreateLabButtonViewProps {
  handleClickButton: VoidFunction;
}

const CreateClassLabButtonView: React.FC<CreateLabButtonViewProps> = (
  props
) => {
  const { handleClickButton } = props;

  return (
    <Button
      startIcon={<AddCircleRoundedIcon />}
      onClick={handleClickButton}
      variant="contained"
    >
      Open Class Lab
    </Button>
  );
};

export default React.memo(CreateClassLabButtonView);
