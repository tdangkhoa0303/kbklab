import React, {PropsWithChildren} from 'react';
import {CookiesProvider} from 'react-cookie';
import {BrowserRouter} from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {ReduxProvider} from '../ReduxComponent';
import {UserProvider} from '../UserProvider';
import {ReduxConfigurations} from './AppProvider.types';

export interface AppProviderProps {
	reduxConfigurations: ReduxConfigurations;
}

const AppProvider: React.FC<PropsWithChildren<AppProviderProps>> = (props) => {
	const {children, reduxConfigurations} = props;

	return (
		<ReduxProvider reduxConfigurations={reduxConfigurations}>
			<CookiesProvider>
				<UserProvider>
					<BrowserRouter>{children}</BrowserRouter>
				</UserProvider>
			</CookiesProvider>
			<ToastContainer
				position="top-center"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>
		</ReduxProvider>
	);
};

export default React.memo(AppProvider);
