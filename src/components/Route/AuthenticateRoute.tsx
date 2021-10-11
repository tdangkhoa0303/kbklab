import React, {PropsWithChildren} from 'react';
import {useUser} from 'shared/hooks';
import {Redirect, Route, RouteProps, Switch} from 'react-router-dom';
import {AppCommonRoute} from '../../shared/constants';

const AuthenticateRoute: React.FC<PropsWithChildren<RouteProps>> = (props) => {
	const {children, ...restProps} = props;
	const userInfo = useUser();

	return (
		<Route {...restProps}>
			<Switch>
				{userInfo ? <Redirect to={AppCommonRoute.Home}/> : children}
			</Switch>
		</Route>
	)
}

export default React.memo(AuthenticateRoute);