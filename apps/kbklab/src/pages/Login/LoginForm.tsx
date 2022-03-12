import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import {FormikListener, FormikTextField} from 'components';
import {Formik} from 'formik';
import noop from 'lodash/noop';
import React from 'react';
import {login} from 'shared/components';
import {useLoading} from 'shared/hooks';
import {INITIAL_LOGIN_VALUES} from './LoginForm.constants';
import {useHandleLoginForm, useLoginFormValidator} from './LoginForm.hooks';
import {LoginFormValues} from './LoginForm.types';

const LoginForm: React.FC = () => {
	const isLoading = useLoading([login]);
	const formValidator = useLoginFormValidator();

	const {isError, handleFormError, handleSubmitForm, handleFormChange} = useHandleLoginForm(INITIAL_LOGIN_VALUES);

	return (
		<Formik
			initialValues={INITIAL_LOGIN_VALUES}
			validate={formValidator}
			onSubmit={noop}
		>
			<Box display="flex" flexDirection="column" sx={{height: 'fit-content'}}>
				<Stack spacing={3} mb={3}>
					<FormikTextField
						label="Email"
						placeholder="Email"
						name="email"
						type="email"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<EmailIcon />
								</InputAdornment>
							),
						}}
					/>
					<FormikTextField
						label="Password"
						placeholder="Password"
						name="password"
						type="password"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<LockIcon />
								</InputAdornment>
							),
						}}
					/>
				</Stack>
				<LoadingButton
					loading={isLoading}
					variant="contained"
					size="large"
					disabled={isError || isLoading}
					onClick={handleSubmitForm}
				>
					Log In
				</LoadingButton>
				<FormikListener<LoginFormValues> onChange={handleFormChange} onErrors={handleFormError} />
			</Box>
		</Formik>
	);
};

export default LoginForm;
