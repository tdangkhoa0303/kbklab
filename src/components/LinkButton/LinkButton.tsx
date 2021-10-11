import React from 'react';
import {NavLink, NavLinkProps} from 'react-router-dom';
import {alpha} from '@mui/material/styles';
import ButtonBase, {ButtonBaseProps} from '@mui/material/ButtonBase';
import Tooltip from '@mui/material/Tooltip';

export type LinkButtonProps = Pick<ButtonBaseProps, 'sx'> & Pick<NavLinkProps, 'to'> & {
	routeName?: string
};

const LinkButton: React.FC<LinkButtonProps> = (props) => {
	const {children, routeName, ...restProps} = props;

	return (
		<Tooltip
			arrow
			title={routeName || ''}
			placement="right"
		>
			<ButtonBase
				exact
				sx={{
					padding: theme => theme.spacing(1),
					color: theme => theme.palette.primary.main,
					borderRadius: theme => theme.spacing(1.5),
					transition: 'all .2s ease-in-out',

					'&:hover, &.active': {
						background: theme => alpha(theme.palette.primary.main, 0.15),
					}
				}}
				component={NavLink}
				{...restProps}
			>
				{children}
			</ButtonBase>
		</Tooltip>
	)
}

export default React.memo(LinkButton);