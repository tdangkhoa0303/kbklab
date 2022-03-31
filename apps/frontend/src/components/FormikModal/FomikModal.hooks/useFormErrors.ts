import { FormikErrors } from 'formik';
import isEmpty from 'lodash/isEmpty';
import { useCallback, useMemo } from 'react';
import { useToggle } from 'shared/hooks';

export type UseFormErrorsReturnedValues<TFormValues> = [
  isError: boolean,
  handleFormErrors: (errors: FormikErrors<TFormValues>) => void
];

export const useFormErrors = <
  TFormValues
>(): UseFormErrorsReturnedValues<TFormValues> => {
  const [isError, toggleError] = useToggle(false);

  const handleFormErrors = useCallback(
    (errors: FormikErrors<TFormValues>) => {
      toggleError(!isEmpty(errors));
    },
    [toggleError]
  );

  return useMemo(
    () => [isError, handleFormErrors],
    [handleFormErrors, isError]
  );
};
