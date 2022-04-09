import React, {useEffect} from 'react';
import {useUser} from 'shared/hooks';

export interface FetchAppDataProps {
  requests: VoidFunction[];
}

const FetchAppData: React.FC<FetchAppDataProps> = (props) => {
  const {requests} = props;
  const user = useUser();

  useEffect(() => {
    if(user) {
      requests.forEach((request) => request());
    }
  }, [requests, user]);

  return null;
};

export default React.memo(FetchAppData);
