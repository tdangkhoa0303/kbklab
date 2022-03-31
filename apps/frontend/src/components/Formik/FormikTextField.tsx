import React, { useMemo } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import { useField } from 'formik';

export type FormikTextFieldProps = TextFieldProps & {
  name: string;
};

const FormikTextField: React.FC<FormikTextFieldProps> = (props) => {
  const { name, label, helperText, ...restProps } = props;
  const [field, meta] = useField(name);
  const { error, touched } = meta;
  const isError = useMemo(() => Boolean(error && touched), [error, touched]);

  return (
    <TextField
      error={isError}
      helperText={isError ? error : helperText}
      label={label}
      {...restProps}
      {...field}
    />
  );
};

export default React.memo(FormikTextField);
