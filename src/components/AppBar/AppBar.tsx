import React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {cssLayout} from 'shared/utilities';
import {CustomIconButton} from '../StyledComponents';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {useUser} from 'shared/hooks';
import Avatar from '@mui/material/Avatar';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import Typography from '@mui/material/Typography';
import LabSearch from './LabSearch';

const StyledMuiAppBar = styled(MuiAppBar)(({theme}) => ({
	background: 'transparent',
	boxShadow: 'none'
}))

const StyledToolbar = styled(Toolbar)(({theme}) => ({
	...cssLayout.centerCenter,
	paddingTop: 1.5,
	paddingBottom: 1.5,
	minHeight: theme.dimension.appBarHeight,
	display: 'flex',
}))

const StyledIconButton = styled(CustomIconButton)(({theme}) => ({
	margin: theme.spacing(0, 0, 0, 2)
}))

const mockAvatarUrl = 'https://play-lh.googleusercontent.com/kgSwHEst2ENqeYoasBoxvUcPD97c0RdIUxRYy6KlMUjiWlwzvPqg4ZSNGrweAps_g7c';

const AppBar: React.FC = () => {
	const user = useUser();

	return (
		<StyledMuiAppBar
			sx={{
				position: 'relative',
				marginLeft: theme => theme.dimension.sidebarWidth,
				width: theme => `calc(100% - ${theme.dimension.sidebarWidth})`
			}}
		>
			<StyledToolbar>
				<Typography variant="h5">
					KBK Lab
				</Typography>
				<Box sx={{flexGrow: 2}} />
				<LabSearch />
				<StyledIconButton>
					<NotificationsNoneIcon/>
				</StyledIconButton>
				<StyledIconButton sx={{borderRadius: theme => theme.spacing(3)}}>
					<Avatar
						alt={user.name}
						src={mockAvatarUrl}
						sx={{
							width: theme => theme.spacing(4),
							height: theme => theme.spacing(4),
							marginRight: 1.5
						}}
					/>
					<SettingsOutlinedIcon/>
				</StyledIconButton>
			</StyledToolbar>
		</StyledMuiAppBar>
	)
}

export default React.memo(AppBar);

