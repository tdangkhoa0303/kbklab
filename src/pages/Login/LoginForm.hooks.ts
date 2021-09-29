import {useCallback, useMemo, useState} from 'react';
import {HandleLoginForm, LoginFormErrors, LoginFormValues} from './LoginForm.types';
import isEmpty from 'lodash/isEmpty';
import {useRequestLogin} from '../../shared/hooks/useRequestLogin';
import validator from 'validator'

type LoginFormValidator = (values: LoginFormValues) => LoginFormErrors;
export const useLoginFormValidator = (): LoginFormValidator => (
	useCallback((values: LoginFormValues) => {
		const {email, password} = values;
		if(!email) {
			return {
				email: 'Email is required'
			}
		}

		if(!validator.isEmail(email)) {
			return {
				email: 'Invalid email'
			}
		}

		if(!password) {
			return {
				password: 'Password is required'
			}
		}

		return {}
	}, [])
)

export const useHandleLoginForm = (initialValues: LoginFormValues): HandleLoginForm => {
	const [loginValues, setLoginValues] = useState<LoginFormValues>(initialValues);
	const [isError, setIsError] = useState<boolean>(false);
	const requestLogin = useRequestLogin();

	const handleFormError = useCallback((errors) => {
		console.log(errors)
		setIsError(!isEmpty(errors))
	}, [setIsError]);
	const handleSubmitForm = useCallback(() => {
		requestLogin(loginValues)
	}, [requestLogin, loginValues])

	return useMemo(() => ({
		isError,
		handleFormError,
		handleSubmitForm,
		handleFormChange: setLoginValues
	}), [handleFormError, handleSubmitForm, isError])
}