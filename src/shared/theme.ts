import {createTheme} from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
	interface CommonColors {
		green: string,
		red: string
	}
}

const colors = {
	green: '#4caf50',
	red: '#ff3d00'
}

const theme = createTheme({
	typography: {
		fontFamily: 'Montserrat, sans-serif',
	},
	palette: {
		common: {
			green: colors.green,
			red: colors.red
		}
	},
});


export default theme;


