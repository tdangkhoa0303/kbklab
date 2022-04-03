import {ThemeOptions} from '@mui/material/styles';

declare module '@mui/material/styles/createPalette' {
  interface CommonColors {
    green: string;
    red: string;
    greenBlue: string;
    grey: string;
    yellow: string;
    spaceGrey: string;
  }
}

const colors = {
  white: '#ffffff',
  green: '#4caf50',
  red: '#ff3d00',
  black: '#333333',
  blue: '#0091ea',
  grey: '#F3F6F9',
  yellow: '#FFEA00',
  spaceGrey: '#424242',
  greenBlue:
    'linear-gradient(to right, rgb(194 229 156 / 10%), rgb(100 179 244 / 30%))',
};

const themeOptions: ThemeOptions = {
  palette: {
    common: {
      green: colors.green,
      red: colors.red,
      black: colors.black,
      greenBlue: colors.greenBlue,
      grey: colors.grey,
      yellow: colors.yellow,
      spaceGrey: colors.spaceGrey,
    },
  },
};

export default themeOptions;
