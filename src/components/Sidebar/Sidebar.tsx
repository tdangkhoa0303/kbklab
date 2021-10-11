import React from 'react';
import Paper from '@mui/material/Paper';
import {Logo} from '../Logo';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import Box from '@mui/material/Box';
import {cssLayout} from 'shared/utilities';
import {styled} from '@mui/material/styles';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import {LinkButton} from '../LinkButton';
import {AppCommonRoute} from 'shared/constants';

const StyledLinkButton = styled(LinkButton)(({theme}) => ({
	margin: theme.spacing(1, 0),
	width: theme.spacing(8),
	height: theme.spacing(8)
}))

const Sidebar: React.FC = () => {
	return (
		<Paper
			component="nav"
			sx={{
				...cssLayout.centerCenter,
				height: '100vh',
				display: 'flex',
				width: theme => theme.dimension.sidebarWidth,
				padding: theme => theme.spacing(0, 1),
				position: 'fixed',
				top: 0,
				left: 0,
			}}
		>
			<Box
				sx={{
					...cssLayout.centerCenter,
					display: 'flex',
					width: '100%',
					height: theme => theme.dimension.appBarHeight,
					position: 'absolute',
					top: 0,
					left: 0
				}}
			>
				<Logo size={48} />
			</Box>
			<Box display="flex" flexDirection="column" alignItems="center">
				<StyledLinkButton
					to={AppCommonRoute.Home}
					routeName="Home"
				>
					<ScienceOutlinedIcon />
				</StyledLinkButton>
				<StyledLinkButton
					to={AppCommonRoute.Score}
					routeName="Score"
				>
					<SchoolOutlinedIcon />
				</StyledLinkButton>
			</Box>
			<span />
		</Paper>
	)
}

export default React.memo(Sidebar);