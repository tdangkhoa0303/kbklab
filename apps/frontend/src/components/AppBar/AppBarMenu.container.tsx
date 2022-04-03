import React, {useCallback} from 'react';
import {useToggle, useUser} from 'shared/hooks';
import {User} from 'shared/models';
import {useAppBarMenuOptions} from './AppBarMenu.hooks';
import AppBarMenuView from './AppBarMenu.view';

const AppBarMenuContainer: React.FC = () => {
  const [isOpen, toggleIsOpen /* omit toggleOpenOn */, , toggleOpenOff] =
    useToggle(false);
  const user = useUser() as User;
  const options = useAppBarMenuOptions();
  const handleToggle = useCallback(() => toggleIsOpen(), [toggleIsOpen]);

  return (
    <AppBarMenuView
      user={user}
      open={isOpen}
      options={options}
      toggleOpenOff={toggleOpenOff}
      toggleOpen={handleToggle}
    />
  );
};

export default AppBarMenuContainer;
