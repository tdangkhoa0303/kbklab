import React from 'react';
import {AppProvider} from 'shared/components';
import {Route, Switch} from 'react-router-dom';
import {AuthenticateRoute, PrivateRoutes, PrivateRoute} from 'components'
import {AppCommonRoute} from 'shared/constants';
import Login from 'pages/Login';

const StudentDashboard = React.lazy(() => import('pages/StudentDashboard.container'))

function App() {
	return (
		<AppProvider>
			<Switch>
				<AuthenticateRoute path={[AppCommonRoute.LogIn]}>
					<Route path={AppCommonRoute.LogIn}>
						<Login />
					</Route>
				</AuthenticateRoute>
				<PrivateRoutes path={[AppCommonRoute.Home, AppCommonRoute.Score]}>
					<PrivateRoute exact path={AppCommonRoute.Home}>
						<StudentDashboard />
					</PrivateRoute>
					<PrivateRoute exact path={AppCommonRoute.Score}>
						Score
					</PrivateRoute>
				</PrivateRoutes>
			</Switch>
		</AppProvider>
	);
}

export default App;
