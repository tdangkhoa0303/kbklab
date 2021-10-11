import React, {PropsWithChildren} from 'react';
import {Redirect, Route, RouteProps, Switch, useLocation} from 'react-router-dom';
import {MasterLayout} from '../MasterLayout';
import {AppCommonRoute} from '../../shared/constants';
import {useUser} from '../../shared/hooks';

const PrivateRoutes: React.FC<PropsWithChildren<RouteProps>> = (props) => {
	const {children, ...restProps} = props;
	const location = useLocation();
	const userInfo = useUser();

	return (
		<Route {...restProps}>
			{userInfo ? (
				<MasterLayout>
					<Switch>
						{children}
					</Switch>
				</MasterLayout>
			): (
				<Redirect
					to={{
						pathname: AppCommonRoute.LogIn,
						state: {from: location}
					}}
				/>
			)}
		</Route>
	)
}

export default React.memo(PrivateRoutes);