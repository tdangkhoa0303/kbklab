import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import {styled} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import {GoogleLogin, Logo} from 'components';
import {environment} from 'environments/environment';
import React, {useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {useIsLoginSuccess} from 'shared/components';
import {AppCommonRoute} from 'shared/constants';
import {boolean} from 'yup';
import LoginFooter from './LoginFooter';
import LoginForm from './LoginForm';

const StyledImage = styled('img')(({ theme }) => ({
  width: '100%',
  margin: theme.spacing(4),
}));

const Login: React.FC = () => {
  const navigate = useNavigate();
  const isLoginSuccess = useIsLoginSuccess();

  const [searchParams] = useSearchParams();
  const expired = searchParams.get('expired')

  useEffect(() => {
    if (isLoginSuccess) {
      navigate(AppCommonRoute.Root);
    }
    // Just want to listen to isLoginSuccess
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoginSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        height: '100vh',
      }}
    >
      {!!expired && (
        <Typography variant="h6" sx={{
          background: theme => theme.palette.common.red,
          color: theme => theme.palette.common.white,
          padding: 1.5,
          textAlign: 'center'
        }}>
          Your session has been expired. Please log in again.
        </Typography>
      )}
      <Grid container spacing={2} alignItems="center" sx={{ flexGrow: 1 }}>
        <Grid item xs={6}>
          <StyledImage src="/assets/login.svg" alt="login-illustration" />
        </Grid>
        <Grid
          item
          xs={6}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            sx={{
              maxWidth: (theme) => theme.spacing(60),
              margin: 'auto',
              width: '100%',
              padding: (theme) => theme.spacing(2),
            }}
          >
            <Box display="flex" alignItems="center" mb={6}>
              <Logo size={48} />
              <Typography
                ml={2}
                variant="h3"
                sx={{
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                Welcome to&nbsp;
                <Box
                  component="span"
                  sx={{
                    color: (theme) => theme.palette.primary.main,
                    fontWeight: (theme) => theme.typography.fontWeightMedium,
                  }}
                >
                  KBK Lab
                </Box>
              </Typography>
            </Box>
            <GoogleLogin clientId={environment.googleSSOClientId} />
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider>
            {isLoginSuccess === false && (
              <Alert variant="filled" severity="error" sx={{margin: theme => theme.spacing(2, 0, 4)}}>
                Invalid login credentials, please try again.
              </Alert>
            )}
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
      <LoginFooter />
    </Box>
  );
};

export default Login;
