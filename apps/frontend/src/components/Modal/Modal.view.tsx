import CloseIcon from '@mui/icons-material/Close';
import Box, { BoxProps } from '@mui/material/Box';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { PropsWithChildren, ReactNode } from 'react';

const defaultProps = {
  primaryButtonText: 'Confirm',
  secondaryButtonText: 'Cancel',
  isLoading: false,
  hideSecondaryButton: false,
};

type DefaultProps = Readonly<typeof defaultProps>;

export interface ModalViewProps extends Partial<DefaultProps> {
  open: boolean;
  title: ReactNode;
  primaryButtonProps?: Partial<ButtonProps>;
  secondaryButtonProps?: Partial<ButtonProps>;
  onClose: VoidFunction;
  contentProps?: Partial<BoxProps>;
}

export type ModalViewPropsWithDefault = PropsWithChildren<
  ModalViewProps & DefaultProps
>;

const ContentBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  outline: 'none',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  minWidth: theme.spacing(80),
  backgroundColor: theme.palette.common.white,
  borderRadius: theme.spacing(1.5),
  padding: theme.spacing(2, 3),
}));

const ModalView: React.FC<PropsWithChildren<ModalViewProps>> = (props) => {
  const {
    open,
    title,
    onClose,
    children,
    isLoading,
    primaryButtonText,
    primaryButtonProps,
    secondaryButtonText,
    hideSecondaryButton,
    secondaryButtonProps,
    contentProps,
  } = props as ModalViewPropsWithDefault;

  return (
    <Modal
      hideBackdrop
      open={open}
      onClose={onClose}
      sx={{
        outline: 'none',
        backgroundColor: 'rgba(51, 51, 51, 0.7)',
      }}
    >
      <ContentBox {...contentProps}>
        <Typography mb={2} variant="h4" sx={{ fontWeight: 500 }}>
          {title}
        </Typography>
        <IconButton
          edge="end"
          onClick={onClose}
          disabled={isLoading}
          sx={{
            top: (theme) => theme.spacing(1),
            right: (theme) => theme.spacing(2.5),
            position: 'absolute',
          }}
        >
          <CloseIcon />
        </IconButton>
        {children}
        <Box mt={2} display="flex" justifyContent="flex-end">
          {!hideSecondaryButton && (
            <Button
              variant="outlined"
              disabled={isLoading}
              onClick={onClose}
              sx={{
                marginRight: (theme) => theme.spacing(2),
              }}
              {...secondaryButtonProps}
            >
              {secondaryButtonText}
            </Button>
          )}
          <Button
            variant="contained"
            disabled={isLoading}
            {...primaryButtonProps}
          >
            {primaryButtonText}
            {isLoading && (
              <CircularProgress
                size={16}
                sx={{
                  marginLeft: (theme) => theme.spacing(1),
                  color: (theme) => theme.palette.common.white,
                }}
              />
            )}
          </Button>
        </Box>
      </ContentBox>
    </Modal>
  );
};

ModalView.defaultProps = defaultProps;

export default React.memo(ModalView);
