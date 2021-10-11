import {alpha, styled} from '@mui/material/styles';
import {ButtonBase} from '@mui/material';

export const CustomIconButton = styled(ButtonBase)(({theme}) => ({
	padding: theme.spacing(1),
	color: theme.palette.primary.main,
	background: alpha(theme.palette.primary.main, 0.15),
	borderRadius: theme.spacing(1.5),
	transition: 'all .2s ease-in-out',

	'&:hover': {
		color: theme.palette.primary.contrastText,
		background: theme.palette.primary.main,
	}
}))