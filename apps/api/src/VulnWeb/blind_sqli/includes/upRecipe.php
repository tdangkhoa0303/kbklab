<?php
	$un=$_POST['username'];
	$pw=$_POST['password'];
	$hostname = gethostname();
	$gateway = $_ENV['API_HOST'];
	if (($un == 'root' and $pw == '1randompassword2') or ($un == 'user' and $pw == 'password')){
		if ($un == 'root'){
			shell_exec("curl -X PATCH '".$gateway.":7000/api/v1/scores?containerId=".$hostname."&numberSuccess=1'");
		}
		header('location: ../search.php?message=Success');				
	}
	else {
		header('location: ../index.php?message=Wrong username/password combination');			
	}
