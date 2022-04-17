<?php
	
	require_once 'dbh.php';
	
	try {
		$wow=$_POST['search'];
	}
	catch(exception $e){
		$wow='';
	}

	
	try{
		$count=0;
		$query = "SELECT id, name, price FROM items WHERE name LIKE '%$wow%'";
		$results = mysqli_query($conn, $query);
		$resultsCheck = mysqli_num_rows($results);
			if ($resultsCheck > 0) {
				$info_list[0][0] = 'We have this item';
			}
			else{
				$info_list[0][0] = 'Not found, try later';
			}
	} catch (exception $e){
		$info_list[0][0] = "Invalid syntax";
	}
	// if 	($wow == $_POST['search']){
		// ;
		// }
	    session_start();

    // Process POST data

    $_SESSION['message'] = $info_list;

    // Redirect to Page 1
	header('location: ../search.php')
?>
