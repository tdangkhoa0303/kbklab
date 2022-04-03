import Box, {BoxProps} from '@mui/material/Box';
import List from '@mui/material/List';
import React, {useMemo} from 'react';
import {useUser} from 'shared/hooks';
import {sidebarItems} from './Sidebar.constants';
import SidebarNavItem from './sidebarNavSection/SidebarNavItem';

export type SidebarNavSectionProps = BoxProps;

export const SidebarNavSection: React.FC<SidebarNavSectionProps> = (props) => {
  const user = useUser();

  const authorizedSidebarNavItems = useMemo(
    () =>
      sidebarItems.filter(
        (item) =>
          !item.restrictedRole ||
          (user && item.restrictedRole.includes(user.role))
      ),
    [user]
  );

  return (
    <Box {...props}>
      <List disablePadding>
        {authorizedSidebarNavItems.map(({ label, icon, path }) => (
          <SidebarNavItem key={label} icon={icon} path={path} label={label} />
        ))}
      </List>
    </Box>
  );
};

export default React.memo(SidebarNavSection);
