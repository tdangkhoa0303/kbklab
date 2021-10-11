import React, {useMemo} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link, useRouteMatch} from 'react-router-dom';
import {styled} from '@mui/material/styles';

export interface SidebarListItemProps {
	primary: string,
	Icon: React.ComponentType,
	to: string
}

const StyledLink = styled(Link)(() => ({
	all: 'inherit'
}))

const SidebarListItem: React.FC<SidebarListItemProps> = (props) => {
	const {primary, Icon, to} = props;
	const routeMatch = useRouteMatch();
	const isActive = useMemo(() => routeMatch.url.includes(to), [routeMatch, to]);

	return (
		<ListItem disablePadding>
			<ListItemButton>
				<ListItemIcon>
					<Icon />
				</ListItemIcon>
				<ListItemText primary={<StyledLink to={to}>{primary}</StyledLink>}/>
			</ListItemButton>
		</ListItem>
	)
}

export default React.memo(SidebarListItem)