import React, {useEffect, useMemo} from 'react';
import {usePrevious, useUser} from 'shared/hooks';

export interface FetchAppDataProps {
  requests: VoidFunction[];
}

const FetchAppData: React.FC<FetchAppDataProps> = (props) => {
  const {requests} = props;
  const user = useUser();
  const userId = useMemo(() => user ? user.id : '', [user])
  const previousUserId = usePrevious<string>(userId);

  useEffect(() => {
    if(userId && (userId !== previousUserId)) {
      requests.forEach((request) => request());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return null;
};

export default React.memo(FetchAppData);
