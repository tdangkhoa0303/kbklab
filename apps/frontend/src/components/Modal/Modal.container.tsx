import React, {
  PropsWithChildren,
  RefObject,
  useCallback,
  useImperativeHandle,
} from 'react';
import { useToggle } from 'shared/hooks';
import { ModalRef } from './Modal.types';
import ModalView, { ModalViewProps } from './Modal.view';

type PickedProps =
  | 'primaryButtonText'
  | 'secondaryButtonText'
  | 'isLoading'
  | 'hideSecondaryButton'
  | 'primaryButtonProps'
  | 'secondaryButtonProps'
  | 'title'
  | 'contentProps';

export interface ModalProps extends Pick<ModalViewProps, PickedProps> {
  modalRef?: RefObject<ModalRef>;
  onClose?: VoidFunction;
}

export type ModalContainerPropsWithChildren = PropsWithChildren<ModalProps>;

const Modal: React.FC<PropsWithChildren<ModalProps>> = (props) => {
  const { children, modalRef, title, onClose, ...restProps } = props;
  const [isOpenModal /* omit toggle */, , openModal, closeModal] =
    useToggle(false);

  useImperativeHandle(
    modalRef,
    () => ({
      open: openModal,
      close: closeModal,
      isOpen: isOpenModal,
    }),
    [closeModal, openModal, isOpenModal]
  );

  const handleCloseModal = useCallback(() => {
    onClose && onClose();
    closeModal();
  }, [onClose, closeModal]);

  return (
    <ModalView
      title={title}
      open={isOpenModal}
      onClose={handleCloseModal}
      {...restProps}
    >
      {children}
    </ModalView>
  );
};

export default React.memo(Modal);
