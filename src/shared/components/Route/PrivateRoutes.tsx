import React, {PropsWithChildren} from 'react';
import {Switch, SwitchProps} from 'react-router-dom';

const PrivateRoutes: React.FC<PropsWithChildren<SwitchProps>> = (props) => {
	const {children} = props;

	return (
		<Switch>
			{children}
		</Switch>
	)
}