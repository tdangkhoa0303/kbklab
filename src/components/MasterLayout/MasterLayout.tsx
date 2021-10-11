import React, {PropsWithChildren} from 'react';
import {AppBar} from '../AppBar'
import Sidebar from '../Sidebar/Sidebar';
import Box from '@mui/material/Box';

const MasterLayout: React.FC<PropsWithChildren<{}>> = (props) => {
	const {children} = props;

	return (
		<Box sx={{
			backgroundColor: 'common.grey',
			minHeight: '100vh'
		}}>
			<AppBar />
			<Sidebar />
			<Box
				sx={{
					padding: 3,
					margin: theme => `0 0 0 ${theme.dimension.sidebarWidth}`,
					minHeight: theme => `calc(100% - ${theme.dimension.appBarHeight})`,
					height: 'fit-content'
				}}
			>
				{children}
			</Box>
		</Box>
	)
}

export default React.memo(MasterLayout);