import {createTheme, ThemeOptions} from '@mui/material/styles';
import palette from './palette';
import shadows, {customShadows, CustomShadows} from './shadows';
import shape from './shape';
import typography from './typography';
import componentsOverride from './overrides';

declare module '@mui/material' {
	interface Color {
		500_8: string;
		500_12: string;
		500_16: string;
		500_24: string;
		500_32: string;
		500_48: string;
		500_56: string;
		500_80: string;
	}
}

declare module '@mui/material/styles' {
	interface Theme {
		customShadows: CustomShadows;
		shape: {
			borderRadius: number;
			borderRadiusSm: number;
			borderRadiusMd: number;
		};
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		customShadows?: CustomShadows;
		shape?: {
			borderRadius: number;
			borderRadiusSm: number;
			borderRadiusMd: number;
		};
	}
}

const themeOptions: ThemeOptions = {
	palette,
	shape,
	typography,
	shadows,
	customShadows,
};

const theme = createTheme(themeOptions);
theme.components = componentsOverride(theme);

export default theme;
