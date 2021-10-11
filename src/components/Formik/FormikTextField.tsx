import React from 'react';
import TextField, {TextFieldProps} from '@mui/material/TextField';
import {useField} from 'formik';

export type FormikTextFieldProps = TextFieldProps & {
	name: string
};

const FormikTextField: React.FC<FormikTextFieldProps> = (props) => {
	const {name, label, helperText, ...restProps} = props;
	const [field, meta] = useField(name);
	const {error, touched} = meta;

	return (
		<TextField
			sx={{
				marginBottom: theme => theme.spacing(5),

				'& fieldset': {
					boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.06)',
					border: 'none',
					background: '#ffffff40'
				}
			}}
			error={!!error}
			helperText={(!!error && touched) ? error : helperText}
			label={label}
			{...restProps}
			{...field}
		/>
	)
}

export default React.memo(FormikTextField);