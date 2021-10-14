import {createTheme} from '@mui/material/styles';

declare module '@mui/material/styles' {
	interface Theme {
		dimension: {
			appBarHeight: string,
			sidebarWidth: string
		},
		boxShadow: {
			main: string
		}
	}
	// allow configuration using `createTheme`
	interface ThemeOptions {
		dimension: {
			appBarHeight: string,
			sidebarWidth: string
		},
		boxShadow: {
			main: string
		}
	}
}

declare module '@mui/material/styles/createPalette' {
	interface CommonColors {
		green: string,
		red: string,
		greenBlue: string,
		grey: string,
		yellow: string,
		spaceGrey: string
	}
}

const colors = {
	white: '#ffffff',
	green: '#4caf50',
	red: '#ff3d00',
	black: '#1a1919',
	blue: '#0091ea',
	grey: '#F3F6F9',
	yellow: '#FFEA00',
	spaceGrey: '#424242',
	greenBlue: 'linear-gradient(to right, rgb(194 229 156 / 10%), rgb(100 179 244 / 30%))'
}

const theme = createTheme({
	typography: {
		allVariants: {
			color: colors.black,
			fontFamily: 'SF Pro Display, sans-serif'
		}
	},
	palette: {
		primary: {
			main: colors.blue,
			contrastText: colors.white
		},
		common: {
			green: colors.green,
			red: colors.red,
			black: colors.black,
			greenBlue: colors.greenBlue,
			grey: colors.grey,
			yellow: colors.yellow,
			spaceGrey: colors.spaceGrey
		}
	},
	dimension: {
		appBarHeight: '64px',
		sidebarWidth: '80px'
	},
	boxShadow: {
		main: '0px 4px 12px rgba(0, 0, 0, 0.06)'
	}
});


export default theme;


