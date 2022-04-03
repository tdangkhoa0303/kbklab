import {MasterLayout} from 'components';
import React, {PropsWithChildren, useMemo} from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {AppCommonRoute, fallbackPageByUserRole} from 'shared/constants';
import {useUser} from 'shared/hooks';
import {UserRole} from 'shared/models';
import {CreateClassLabButton} from '../CreateClassLabButton';

export interface PrivateOutletProps {
  restrictedRole?: UserRole[];
  minimumRole?: UserRole;
}

const PrivateOutlet: React.FC<PropsWithChildren<PrivateOutletProps>> = ({
  restrictedRole,
  minimumRole,
}) => {
  const location = useLocation();
  const userInfo = useUser();
  const isAuthorized = useMemo((): boolean => {
    if (!userInfo) {
      return false;
    }

    const isInRestrictedList =
      !restrictedRole || restrictedRole.includes(userInfo.role);
    const isMinimumRole = !minimumRole || userInfo.role >= minimumRole;
    return isInRestrictedList && isMinimumRole;
  }, [minimumRole, restrictedRole, userInfo]);

  const appBarContent = useMemo(() => {
    if (userInfo && userInfo.role >= UserRole.Lecturer) {
      return <CreateClassLabButton />;
    }
    return <></>;
  }, [userInfo]);

  if (!userInfo) {
    return <Navigate to={AppCommonRoute.LogIn} state={{ from: location }} />;
  }

  if (!isAuthorized) {
    return (
      <Navigate
        to={fallbackPageByUserRole[userInfo.role]}
        state={{ from: location }}
      />
    );
  }

  return (
    <MasterLayout appBarContent={appBarContent}>
      <Outlet />
    </MasterLayout>
  );
};

export default React.memo(PrivateOutlet);
