import React, {PropsWithChildren} from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import store from 'shared/redux/store';
import theme from 'shared/theme';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import {BrowserRouter} from 'react-router-dom';

export type AppProviderProps = {};

const AppProvider: React.FC<PropsWithChildren<AppProviderProps>> = (props) => {
	const {children} = props;

	return (
		<ReduxProvider store={store}>
			<BrowserRouter>
				<ThemeProvider theme={theme}>
					{children}
				</ThemeProvider>
			</BrowserRouter>
		</ReduxProvider>

	);
}

export default React.memo(AppProvider);
