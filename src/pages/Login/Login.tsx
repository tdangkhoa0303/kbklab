import Grid from '@mui/material/Grid';
import React from 'react';
import LoginForm from './LoginForm';
import {styled} from '@mui/material/styles';

const StyledImage = styled('img')(({theme}) => ({
	width: '100%',
	margin: theme.spacing(4)
}))

const Login: React.FC = () => {
	return (
		<Grid
			container
			spacing={2}
			alignItems="center"
			sx={{height: '100vh'}}
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
	)
}

export default Login;