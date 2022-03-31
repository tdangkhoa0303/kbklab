import { FormikListener, Modal, ModalRef } from 'components';
import Box from '@mui/material/Box';
import { ButtonProps } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Formik, FormikConfig, FormikProps, FormikValues } from 'formik';
import noop from 'lodash/noop';
import React, { PropsWithChildren, RefObject, useMemo } from 'react';
import { ImportDataFormValuesWithFile } from '../ImportDataButton.types';
import {
  useImportDataFormErrors,
  useImportDataFormHandlers,
} from './ImportDataModal.hooks';
import ImportDataUploader from './ImportDataUploader';

export interface ImportDataModalProps<TImportFormValues extends FormikValues>
  extends Partial<FormikProps<TImportFormValues>> {
  onSubmit: (
    formValues: ImportDataFormValuesWithFile<TImportFormValues>
  ) => void;
  sampleFileUrl: string;
  modalRef: RefObject<ModalRef>;
  initialValues: TImportFormValues;
  FormikProps?: Partial<FormikConfig<TImportFormValues>>;
}

const ImportDataModal = <TImportFormValues extends FormikValues>(
  props: PropsWithChildren<ImportDataModalProps<TImportFormValues>>
): React.ReactElement<
  PropsWithChildren<ImportDataModalProps<TImportFormValues>>
> => {
  const {
    onSubmit,
    modalRef,
    sampleFileUrl,
    children,
    initialValues,
    FormikProps,
  } = props;

  const { files, onFilesChange, onSubmitForm, setFormValues } =
    useImportDataFormHandlers({ initialValues, onSubmit });

  const { setErrors, isError } = useImportDataFormErrors(files);

  const primaryButtonProps = useMemo(
    (): Partial<ButtonProps> => ({
      disabled: isError,
      onClick: onSubmitForm,
    }),
    [onSubmitForm, isError]
  );

  return (
    <Modal
      title="Upload"
      modalRef={modalRef}
      primaryButtonProps={primaryButtonProps}
    >
      <Formik onSubmit={noop} initialValues={initialValues} {...FormikProps}>
        <Stack spacing={2} sx={{ width: (theme) => theme.spacing(75) }}>
          {children}
          <ImportDataUploader
            sampleFileUrl={sampleFileUrl}
            onImportingFileChange={onFilesChange}
          />
          <FormikListener<TImportFormValues>
            onErrors={setErrors}
            onChange={setFormValues}
          />
        </Stack>
      </Formik>
    </Modal>
  );
};

export default React.memo(ImportDataModal) as unknown as typeof ImportDataModal;
