import CssBaseline from '@mui/material/CssBaseline';
import {StyledEngineProvider, ThemeOptions, ThemeProvider} from '@mui/material/styles';
import merge from 'lodash/merge';
import React, {PropsWithChildren, useMemo} from 'react';
import GlobalStyles from './GlobalStyles';
import theme from './theme';

export interface ThemeConfigProps {
	theme: ThemeOptions;
}

const ThemeConfig: React.FC<PropsWithChildren<ThemeConfigProps>> = (props) => {
	const {theme: overriddenTheme, children} = props;
	const combinedTheme = useMemo(() => merge(theme, overriddenTheme), [overriddenTheme]);

	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={combinedTheme}>
				<CssBaseline />
				<GlobalStyles />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
};

export default React.memo(ThemeConfig);
