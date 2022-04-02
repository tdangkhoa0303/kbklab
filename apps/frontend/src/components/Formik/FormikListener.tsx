import {FormikErrors, useFormikContext} from 'formik';
import React, {ReactElement, useEffect} from 'react';

export interface FormikListenerProps<TValues> {
  onChange: (values: TValues) => void;
  onErrors: (errors: FormikErrors<TValues>) => void;
}

const FormikListener = <TValues,>(
  props: FormikListenerProps<TValues>
): ReactElement<FormikListenerProps<TValues>> => {
  const { onChange, onErrors } = props;
  const { values, errors } = useFormikContext<TValues>();

  // Only want to listen to values change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onChange(values), [values]);

  // Only want to listen to errors change
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => onErrors(errors), [errors]);

  return <></>;
};

export default React.memo(FormikListener) as unknown as typeof FormikListener;
