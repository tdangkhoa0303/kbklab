import React, {PropsWithChildren, useEffect, useRef, useState} from 'react';
import {useCookies} from 'react-cookie';
import {useMounting} from '../../hooks';
import {OverlayLoader} from '../OverlayLoader';
import {useFetchUser, useFetchUserInfoStatus} from './UserProvider.hooks';

export type UserProviderProps = {};

const UserProvider: React.FC<PropsWithChildren<UserProviderProps>> = (
  props
) => {
  const {children} = props;
  const [{signed}] = useCookies(['signed']);
  const fetchUser = useFetchUser();
  const [isUserReady, setIsUserReady] = useState<boolean>(!signed);
  const isSetUserReady = useRef<boolean | null>(true);
  const fetchUserInfoStatus = useFetchUserInfoStatus();
  useMounting(() => {
    if (signed) {
      fetchUser();
      isSetUserReady.current = false;
    }
  });

  useEffect(() => {
    if (!isSetUserReady.current && fetchUserInfoStatus) {
      setIsUserReady(true);
      isSetUserReady.current = true;
    }
  }, [fetchUserInfoStatus]);

  return <OverlayLoader loading={!isUserReady}>{children}</OverlayLoader>;
};

export default React.memo(UserProvider);
