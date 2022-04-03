import {DateTimePicker, DateTimePickerProps} from '@mui/lab';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import {useField} from 'formik';
import moment, {Moment} from 'moment';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

export interface FormikDataTimePickerProps
  extends Omit<
    DateTimePickerProps<Moment>,
    'renderInput' | 'value' | 'onChange'
  > {
  name: string;
  helperText?: string;
}

const FormikDateTimePicker: React.FC<FormikDataTimePickerProps> = (props) => {
  const { name, label, helperText, ...restProps } = props;
  const [field, meta, helpers] = useField<string>({ name });
  const { setValue: setFieldValue } = helpers;
  const { error, touched, initialValue } = meta;
  const [value, setValue] = useState<Moment | null>(moment(initialValue));
  const isError = useMemo(() => Boolean(error && touched), [error, touched]);

  const renderInput = useCallback(
    (params: TextFieldProps): React.ReactElement => {
      const { inputProps, error, ...restParams } = params;
      return (
        <TextField
          fullWidth
          error={isError && error}
          helperText={isError ? error : helperText}
          inputProps={{
            ...inputProps,
            readOnly: true,
          }}
          {...restParams}
        />
      );
    },
    [helperText, isError]
  );

  useEffect(() => {
    const nextFieldValue = value ? value.toString() : '';
    setFieldValue(nextFieldValue);
    // Only listen on the value of the date picker to update to formik
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <DateTimePicker
        label={label}
        renderInput={renderInput}
        onChange={setValue}
        value={value}
        inputFormat="DD/MM/YYYY HH:mm"
        {...restProps}
      />
      <input hidden {...field} />
    </>
  );
};

export default React.memo(FormikDateTimePicker);
