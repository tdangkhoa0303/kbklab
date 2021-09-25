import React, {PropsWithChildren} from 'react';
import {Redirect, Switch, SwitchProps} from 'react-router-dom';
import {AppUrl} from 'shared/constants';

const PrivateRoutes: React.FC<PropsWithChildren<SwitchProps>> = (props) => {
	const {children} = props;

	return (
		<Switch>
			{children}
		</Switch>
	)
}