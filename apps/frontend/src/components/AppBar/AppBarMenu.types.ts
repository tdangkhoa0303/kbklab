import React from 'react';
import { IconProps } from 'react-iconly';

export interface MenuItemOption {
  key: string;
  label: string;
  onSelect: VoidFunction;
  icon?: React.FC<IconProps>;
}
