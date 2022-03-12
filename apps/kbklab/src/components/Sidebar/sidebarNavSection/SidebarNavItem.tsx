import Box from '@mui/material/Box';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {alpha, styled, useTheme} from '@mui/material/styles';
import React, {useMemo} from 'react';
import {NavLink, useLocation, useMatch} from 'react-router-dom';
import {getSidebarItemIcon} from '../Sidebar.utils';

export interface SidebarNavItemProps {
	label: string;
	path: string;
	icon: string;
}

const ListItemIconStyle = styled(ListItemIcon)({
	width: 22,
	height: 22,
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
});

const SidebarNavItem: React.FC<SidebarNavItemProps> = (props) => {
	const {icon, label, path} = props;
	const {pathname} = useLocation();
	const isActiveRoute = useMemo(() => pathname.startsWith(path), [pathname, path]);

	const theme = useTheme();
	const activeRootStyle = useMemo(
		() => ({
			color: 'primary.main',
			fontWeight: 'fontWeightMedium',
			bgcolor: alpha(
				theme.palette.primary.main,
				theme.palette.action.selectedOpacity
			),
		}),
		[theme]
	);

	return (
		<ListItemButton
			to={path}
			component={NavLink}
			sx={{
				...theme.typography.body2,
				height: 48,
				position: 'relative',
				textTransform: 'capitalize',
				paddingLeft: theme.spacing(5),
				paddingRight: theme.spacing(2.5),
				color: theme.palette.text.secondary,
				'&:before': {
					top: 0,
					right: 0,
					width: 3,
					bottom: 0,
					content: "''",
					display: isActiveRoute ? 'block' : 'none',
					position: 'absolute',
					borderTopLeftRadius: 4,
					borderBottomLeftRadius: 4,
					backgroundColor: theme.palette.primary.main,
				},
				...(isActiveRoute && activeRootStyle),
			}}
		>
			<ListItemIconStyle>
				{icon && getSidebarItemIcon(icon)}
			</ListItemIconStyle>
			<ListItemText disableTypography primary={label} />
		</ListItemButton>
	);
};

export default React.memo(SidebarNavItem);
