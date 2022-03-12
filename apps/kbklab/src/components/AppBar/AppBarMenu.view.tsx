import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {styled} from '@mui/material/styles';
import React, {useRef} from 'react';
import {User} from 'shared/models';
import {MenuItemOption} from './AppBarMenu.types';

export interface AppBarMenuViewProps {
	open: boolean;
	toggleOpen: VoidFunction;
	toggleOpenOff: VoidFunction;
	options: MenuItemOption[];
	user: User;
}

const StyledMenu = styled(Menu)(({theme}) => ({
	marginRight: theme.spacing(10),
}));

const mockAvatarUrl =
	'https://play-lh.googleusercontent.com/kgSwHEst2ENqeYoasBoxvUcPD97c0RdIUxRYy6KlMUjiWlwzvPqg4ZSNGrweAps_g7c';

const AppBarMenuView: React.FC<AppBarMenuViewProps> = (props) => {
	const {options, open, toggleOpen, toggleOpenOff, user} = props;
	const anchorRef = useRef<HTMLDivElement>(null);

	return (
		<>
			<IconButton edge="end" onClick={toggleOpen} sx={{borderRadius: (theme) => theme.spacing(3)}}>
				<Avatar
					ref={anchorRef}
					alt={user.name}
					src={mockAvatarUrl}
					sx={{
						width: (theme) => theme.spacing(5),
						height: (theme) => theme.spacing(5),
					}}
				/>
			</IconButton>
			{anchorRef.current && (
				<StyledMenu
					open={open}
					onClose={toggleOpenOff}
					anchorEl={anchorRef.current}
					anchorOrigin={{
						horizontal: 'left',
						vertical: 'bottom',
					}}
					PaperProps={{
						sx: {
							boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)',
							minWidth: (theme) => theme.spacing(32),
							width: 'max-content',
							borderRadius: (theme) => theme.spacing(1),
						},
					}}
				>
					<MenuItem>
						Hi,&nbsp;<b>{user.name}</b>
					</MenuItem>
					<Divider />
					{options.map(({key, icon: Icon, label, onSelect}) => (
						<MenuItem key={key} onClick={onSelect}>
							{Icon && (
								<ListItemIcon>
									<Icon />
								</ListItemIcon>
							)}
							<ListItemText primary={label} />
						</MenuItem>
					))}
				</StyledMenu>
			)}
		</>
	);
};

export default React.memo(AppBarMenuView);
