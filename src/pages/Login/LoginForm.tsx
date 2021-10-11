import React from 'react';
import {INITIAL_LOGIN_VALUES} from './LoginForm.constants';
import {useHandleLoginForm, useLoginFormValidator} from './LoginForm.hooks';
import {Formik} from 'formik';
import noop from 'lodash/noop';
import FormikTextField from 'components/Formik/FormikTextField';
import LoadingButton from '@mui/lab/LoadingButton';
import {useLoading} from 'shared/hooks/useLoading';
import FormikListener from 'components/Formik/FormikListener';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {LoginFormValues} from './LoginForm.types';
import Box from '@mui/material/Box'
import {login} from 'shared/components/UserProvider/UserProvider.thunk';
import Typography from '@mui/material/Typography';
import {Logo} from 'components';

const LoginForm: React.FC = () => {
	const isLoading = useLoading([login]);
	const formValidator = useLoginFormValidator();

	const {
		isError,
		handleFormError,
		handleSubmitForm,
		handleFormChange
	} = useHandleLoginForm(INITIAL_LOGIN_VALUES);

	return (
		<Formik
			enableReinitialize
			initialValues={INITIAL_LOGIN_VALUES}
			validate={formValidator}
			onSubmit={noop}
		>
			<Box
				display="flex"
				flexDirection="column"
				sx={{
					width: theme => theme.spacing(60),
					height: 'fit-content'
				}}
			>
				<Box display="flex" alignItems="center" mb={6}>
					<Logo />
					<Typography
						ml={2}
						variant="h3"
						sx={{
							textAlign: 'left',
							fontWeight: theme => theme.typography.fontWeightMedium,
							width: '100%'
						}}
					>
						LOGIN
					</Typography>
				</Box>
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
						)
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
						)
					}}
				/>
				<LoadingButton
					loading={isLoading}
					variant="contained"
					disabled={isError || isLoading}
					onClick={handleSubmitForm}
				>
					Log In
				</LoadingButton>
				<FormikListener<LoginFormValues>
					onChange={handleFormChange}
					onErrors={handleFormError}
				/>
			</Box>
		</Formik>
	)
}

export default LoginForm;