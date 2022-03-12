import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import React from 'react';
import {Link} from 'react-router-dom';
import {Logo} from '../Logo';
import {SidebarNavSection} from './SidebarNavSection';
import SidebarUserButton from './SidebarUserButton';

const Sidebar: React.FC = () => {
	return (
		<Drawer
			open
			anchor="left"
			variant="permanent"
			PaperProps={{
				sx: {
					width: (theme) => theme.spacing(35),
					bgcolor: 'background.default',
					position: 'relative',
				},
			}}
		>
			<Box sx={{px: 2.5, py: 3}}>
				<Box component={Link} to="/" sx={{display: 'inline-flex'}}>
					<Logo size={48} />
				</Box>
			</Box>
			<SidebarUserButton />
			<SidebarNavSection />
		</Drawer>
	);
};

export default React.memo(Sidebar);
