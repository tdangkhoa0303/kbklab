import React, {PropsWithChildren, Suspense} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import store from 'shared/redux/store';
import theme from 'shared/theme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {BrowserRouter} from 'react-router-dom';
import FetchUser from './FetchUser';
import CircularProgress from '@mui/material/CircularProgress'

export type AppProviderProps = {};

const AppProvider: React.FC<PropsWithChildren<AppProviderProps>> = (props) => {
	const {children} = props;

	return (
		<ReduxProvider store={store}>
			<Suspense fallback={<CircularProgress size={64} />}>
				<FetchUser>
					<BrowserRouter>
						<ThemeProvider theme={theme}>
							{children}
						</ThemeProvider>
					</BrowserRouter>
				</FetchUser>
			</Suspense>
		</ReduxProvider>

	);
}

export default React.memo(AppProvider);
