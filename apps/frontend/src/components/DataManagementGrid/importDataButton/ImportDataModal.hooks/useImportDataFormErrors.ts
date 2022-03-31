import { FormikErrors, FormikValues } from 'formik';
import { useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';

export interface UseImportDataFormErrorsReturnValues<
  TFormValues extends FormikValues = FormikValues
> {
  setErrors: (errors: FormikErrors<TFormValues>) => void;
  isError: boolean;
}

export const useImportDataFormErrors = <
  TFormValues extends FormikValues = FormikValues
>(
  files: FileList | null
): UseImportDataFormErrorsReturnValues<TFormValues> => {
  const [errors, setErrors] = useState<FormikErrors<TFormValues>>({});
  const isError = useMemo(() => !isEmpty(errors) || !files, [errors, files]);

  return useMemo(
    () => ({
      isError,
      setErrors,
    }),
    [setErrors, isError]
  );
};
