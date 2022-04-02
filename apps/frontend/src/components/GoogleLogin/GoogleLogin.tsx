import {styled} from '@mui/material/styles';
import React, {useCallback} from 'react';
import {GoogleLogin as GoogleLoginComponent, GoogleLoginProps,} from 'react-google-login';
import {useDispatch} from 'react-redux';
import {loginWithGoogle} from 'shared/components';

const StyledGoogleLoginComponent = styled(GoogleLoginComponent)(() => ({
  width: '100%',
  justifyContent: 'center',
  boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.05) !important',
  borderRadius: '16px',

  '& > div': {
    background: 'transparent !important',
  },
}));

const GoogleLogin: React.FC<GoogleLoginProps> = (props) => {
  const { clientId } = props;
  const dispatch = useDispatch();
  const handleSuccess = useCallback(
    (response: any) => {
      return dispatch(
        loginWithGoogle({
          token: response.tokenId,
        })
      );
    },
    [dispatch]
  );

  return (
    <StyledGoogleLoginComponent clientId={clientId} onSuccess={handleSuccess} />
  );
};

export default React.memo(GoogleLogin);
