import MuiAppBar, {AppBarProps as MuiAppBarProps} from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {alpha, styled} from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import React, {PropsWithChildren} from 'react';
import AppBarMenu from './AppBarMenu.container';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(MuiAppBar)(({theme}) => ({
	boxShadow: 'none',
	backdropFilter: 'blur(6px)',
	WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
	backgroundColor: alpha(theme.palette.background.default, 0.72),
	[theme.breakpoints.up('lg')]: {
		width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
	},
}));

const ToolbarStyle = styled(Toolbar)(({theme}) => ({
	minHeight: APPBAR_MOBILE,
	[theme.breakpoints.up('lg')]: {
		minHeight: APPBAR_DESKTOP,
		padding: theme.spacing(0, 2),
	},
}));

const AppBar: React.FC<PropsWithChildren<MuiAppBarProps>> = (props) => {
	const {children, ...restProps} = props;

	return (
		<RootStyle {...restProps}>
			<ToolbarStyle>
				{children}
				<Box sx={{flexGrow: 1}} />
				<Stack direction="row" alignItems="center" spacing={{xs: 0.5, sm: 1.5}}>
					<AppBarMenu />
				</Stack>
			</ToolbarStyle>
		</RootStyle>
	);
};

export default React.memo(AppBar);
