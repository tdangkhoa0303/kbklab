import {Icon} from '@iconify/react';
import React from 'react';

export const getSidebarItemIcon = (iconName: string): React.ReactElement => (
  <Icon icon={iconName} width={24} height={24} />
);
