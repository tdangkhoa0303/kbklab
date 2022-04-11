import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {fallbackPageByUserRole} from 'shared/constants';
import {useUser} from 'shared/hooks';

const AuthOutlet: React.FC = () => {
  const location = useLocation();
  const userInfo = useUser();

  return userInfo ? (
    <Navigate to={fallbackPageByUserRole[userInfo.role]} state={{from: location}} />
  ) : (
    <Outlet />
  );
};

export default React.memo(AuthOutlet);
