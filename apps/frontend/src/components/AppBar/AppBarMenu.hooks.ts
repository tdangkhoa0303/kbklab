import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { useLogout } from 'shared/components';
import { MenuItemOption } from './AppBarMenu.types';

export const useAppBarMenuOptions = (): MenuItemOption[] => {
  const logout = useLogout();

  return [
    {
      key: 'logout',
      label: 'Log out',
      onSelect: logout,
      icon: PowerSettingsNewIcon,
    },
  ];
};
