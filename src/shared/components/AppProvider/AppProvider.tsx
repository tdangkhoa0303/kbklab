import React, {PropsWithChildren, Suspense} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import store from 'shared/redux/store';
import theme from 'shared/theme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {BrowserRouter} from 'react-router-dom';
import {UserProvider} from '../UserProvider';
import CircularProgress from '@mui/material/CircularProgress';
import {CookiesProvider} from 'react-cookie';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export type AppProviderProps = {};

const AppProvider: React.FC<PropsWithChildren<AppProviderProps>> = (props) => {
	const {children} = props;

	return (
		<ReduxProvider store={store}>
			<CookiesProvider>
				<Suspense fallback={<CircularProgress size={64} />}>
					<UserProvider>
						<BrowserRouter>
							<ThemeProvider theme={theme}>
								{children}
							</ThemeProvider>
						</BrowserRouter>
					</UserProvider>
				</Suspense>
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
}

export default React.memo(AppProvider);
