import { FileInputChangeHandler } from 'components';
import { FormikValues } from 'formik';
import { useCallback, useMemo, useState } from 'react';
import { ImportDataFormValuesWithFile } from '../../ImportDataButton.types';

export interface ImportDataFormHandlers<
  TImportDataFormValues extends FormikValues = FormikValues
> {
  files: FileList | null;
  onFilesChange: FileInputChangeHandler;
  onSubmitForm: VoidFunction;
  setFormValues: (formValues: TImportDataFormValues) => void;
}

export interface UseImportDataFormHandlersParams<
  TImportDataFormValues extends FormikValues = FormikValues
> {
  onSubmit: (
    formValues: ImportDataFormValuesWithFile<TImportDataFormValues>
  ) => void;
  initialValues: TImportDataFormValues;
}

export const useImportDataFormHandlers = <
  TImportDataFormValues extends FormikValues = FormikValues
>(
  params: UseImportDataFormHandlersParams<TImportDataFormValues>
): ImportDataFormHandlers<TImportDataFormValues> => {
  const { initialValues, onSubmit } = params;
  const [files, setFiles] = useState<FileList | null>(null);
  const [formValues, setFormValues] =
    useState<TImportDataFormValues>(initialValues);

  const onSubmitForm = useCallback(() => {
    const formValuesWithFiles = {
      ...formValues,
      files,
    };
    onSubmit(formValuesWithFiles);
  }, [files, formValues, onSubmit]);

  return useMemo(
    () => ({
      files,
      onSubmitForm,
      setFormValues,
      onFilesChange: setFiles,
    }),
    [files, onSubmitForm]
  );
};
