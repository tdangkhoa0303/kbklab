import React, {PropsWithChildren} from 'react';
import {Route, RouteProps} from 'react-router-dom';

const PrivateRoute: React.FC<PropsWithChildren<RouteProps>> = (props) => {
	const {children, ...restProps} = props;

	return (
		<Route {...restProps}>
			{children}
		</Route>
	)
}

export default React.memo(PrivateRoute);