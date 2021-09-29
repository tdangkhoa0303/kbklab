import {FormikErrors} from 'formik';

export interface LoginFormValues {
	email: string,
	password: string
}

export type LoginFormErrors = FormikErrors<LoginFormValues>

export interface HandleLoginForm {
	isError: boolean,
	handleSubmitForm: VoidFunction,
	handleFormError: (errors: LoginFormErrors) => void,
	handleFormChange: (values: LoginFormValues) => void
}