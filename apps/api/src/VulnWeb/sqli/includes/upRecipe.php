<?php
	include_once 'dbh.php';
	
	
	$un=$_POST['username'];
	$pw=$_POST['password'];
	$errors=[];
	$password = $pw;
	$query = "SELECT user_id FROM users WHERE user_name='$un' AND user_password='$password' LIMIT 1";
	$results = mysqli_query($conn, $query);
	$hostname = gethostname();
	$gateway = $_ENV['API_HOST'];
	if (mysqli_num_rows($results) == 1) {
		if (empty($password)){
			shell_exec("curl -X PATCH '".$gateway.":7000/api/v1/scores?containerId=".$hostname."&numberSuccess=1'");
		} elseif ($pw != 'superhardpassword') {
			shell_exec("curl -X PATCH '".$gateway.":7000/api/v1/scores?containerId=".$hostname."&numberSuccess=2'");
		} elseif ($un == 'root' and $pw == 'superhardpassword'){
			shell_exec("curl -X PATCH '".$gateway.":7000/api/v1/scores?containerId=".$hostname."&numberSuccess=3'");
		}
		header('location: ../search.php?message=Success');	
	}
	else {
		header('location: ../index.php?message=Wrong username/password combination');			
	}
