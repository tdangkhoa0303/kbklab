import React, {useEffect} from 'react';
import {useFormikContext, FormikErrors} from 'formik';

export interface FormikListenerProps<TValues> {
	onChange: (values: TValues) => void,
	onErrors: (errors: FormikErrors<TValues>) => void
}

const FormikListener = <TValues, >(props: FormikListenerProps<TValues>): null => {
	const {onChange, onErrors} = props;
	const {values, errors} = useFormikContext<TValues>();

	// Only wanna listen to values change
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => onChange(values), [values]);

	// Only wanna listen to errors change
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => onErrors(errors), [errors])

	return null;
}

export default React.memo(FormikListener) as unknown as typeof FormikListener;