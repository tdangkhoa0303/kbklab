import {Modal, ModalRef} from 'components';
import React, {PropsWithChildren, useCallback, useMemo, useRef, useState,} from 'react';
import {confirmationModalInitialState} from './ConfirmationModal.constants';
import {ConfirmationModalContextProvider} from './ConfirmationModal.context';
import {ConfirmationModalState} from './ConfirmationModal.types';

export type ConfirmationModalProps = {};

const ConfirmationModal: React.FC<
  PropsWithChildren<ConfirmationModalProps>
> = ({ children }) => {
  const [state, setState] = useState<ConfirmationModalState>(
    confirmationModalInitialState
  );
  const modalRef = useRef<ModalRef>(null);

  const { title, confirmText, cancelText, content, onConfirm } = state;

  const showConfirmation = useCallback(
    (overriddenState: Partial<ConfirmationModalState>) => {
      setState((previousState) => ({
        ...previousState,
        ...overriddenState,
      }));
      modalRef.current && modalRef.current.open();
    },
    []
  );

  const memoizedContextValues = useMemo(
    () => ({
      state,
      setState,
      showConfirmation,
    }),
    [showConfirmation, state]
  );

  const handleConfirmation = useCallback(() => {
    onConfirm();
    modalRef.current && modalRef.current.close();
  }, [onConfirm]);

  return (
    <ConfirmationModalContextProvider value={memoizedContextValues}>
      {children}
      <Modal
        title={title}
        modalRef={modalRef}
        contentProps={{
          sx: {
            top: '30%',
            maxWidth: theme => theme.spacing(35)
          }
        }}
        primaryButtonText={confirmText}
        secondaryButtonText={cancelText}
        primaryButtonProps={{ onClick: handleConfirmation }}
      >
        {content}
      </Modal>
    </ConfirmationModalContextProvider>
  );
};

export default React.memo(ConfirmationModal);
