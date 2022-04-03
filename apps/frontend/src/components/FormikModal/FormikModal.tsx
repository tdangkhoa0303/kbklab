import {Formik, FormikConfig, FormikErrors, FormikProps, FormikValues,} from 'formik';
import noop from 'lodash/noop';
import React, {PropsWithChildren, RefObject, useCallback, useRef,} from 'react';
import {FormikListener} from '../Formik';
import {Modal, ModalProps, ModalRef} from '../Modal';
import {useButtonProps} from './FomikModal.hooks';
import {useFormErrors} from './FomikModal.hooks/useFormErrors';

export interface FormikModalProps<TValues extends FormikValues = FormikValues>
  extends FormikConfig<TValues> {
  title: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  modalRef: RefObject<ModalRef>;
  onSubmit: (values: TValues) => void;
  validator?: (values: TValues) => FormikErrors<TValues>;
  ModalProps?: Partial<ModalProps>;
}

const FormikModal = <TValues extends FormikValues = FormikValues>(
  props: PropsWithChildren<FormikModalProps<TValues>>
): React.ReactElement<PropsWithChildren<FormikModalProps<TValues>>> => {
  const {
    title,
    modalRef,
    children,
    ModalProps,
    isLoading,
    isDisabled,
    ...FormikProps
  } = props;
  const formikRef = useRef<FormikProps<TValues>>(null);
  const handleSubmitForm = useCallback(async () => {
    if (formikRef.current) {
      await formikRef.current.submitForm();
    }
  }, []);

  const [isError, handleFormErrors] = useFormErrors<TValues>();
  const { primaryButtonProps, secondaryButtonProps } = useButtonProps({
    isError,
    isLoading,
    isDisabled,
    handleSubmitForm,
  });

  return (
    <Modal
      title={title}
      modalRef={modalRef}
      primaryButtonText="Confirm"
      secondaryButtonText="Cancel"
      primaryButtonProps={primaryButtonProps}
      secondaryButtonProps={secondaryButtonProps}
      {...ModalProps}
    >
      <Formik<TValues> innerRef={formikRef} {...FormikProps}>
        <>
          {children}
          <FormikListener<TValues>
            onChange={noop}
            onErrors={handleFormErrors}
          />
        </>
      </Formik>
    </Modal>
  );
};

export default React.memo(FormikModal) as unknown as typeof FormikModal;
