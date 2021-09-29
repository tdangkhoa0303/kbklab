import React from 'react';
import {AppProvider} from 'shared/components';
import {Redirect, Route} from 'react-router-dom';

const Login = React.lazy(() => import('pages/Login/Login'))

function App() {
	return (
		<AppProvider>
			<Route path="/login">
				<Login />
			</Route>
			<Redirect to="/login" />
		</AppProvider>
	);
}

export default App;
