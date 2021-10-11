import Grid from '@mui/material/Grid';
import React, {useEffect} from 'react';
import LoginForm from './LoginForm';
import LoginFooter from './LoginFooter';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import {useHistory} from 'react-router-dom';
import {useIsLoginSuccess} from '../../shared/components/UserProvider/UserProvider.hooks';
import {AppCommonRoute} from '../../shared/constants';

const StyledImage = styled('img')(({theme}) => ({
	width: '100%',
	margin: theme.spacing(4)
}))

const Login: React.FC = () => {
	const history = useHistory();
	const isLoginSuccess = useIsLoginSuccess();

	useEffect(() => {
		if(isLoginSuccess) {
			history.push(AppCommonRoute.Home)
		}
		// Just want to listen to isLoginSuccess
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoginSuccess])

	return (
		<Box
			display="flex"
			flexDirection="column"
			sx={{
				height: '100vh',
				background: 'linear-gradient(to right, rgb(194 229 156 / 10%), rgb(100 179 244 / 30%))'
			}}
		>
			<Grid
				container
				spacing={2}
				alignItems="center"
				sx={{flexGrow: 1}}
			>
				<Grid item xs={6}>
					<StyledImage src="images/login.svg" alt="login-illustration" />
				</Grid>
				<Grid
					item xs={6}
					display="flex"
					flexDirection="column"
					justifyContent="center"
					alignItems="center"
				>
					<LoginForm />
				</Grid>
			</Grid>
			<LoginFooter />
		</Box>
	)
}

export default Login;