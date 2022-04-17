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
				while ($row = mysqli_fetch_assoc($results)){
					$info_id= $row['id'];
					$info_name= $row['name'];
					$info_amount= $row['price'];
					$info_list[$count][0]=$info_id;
					$info_list[$count][1]=$info_name;
					$info_list[$count][2]=$info_amount;
					$count+=1;
				}	
			}
			else{
				$info_list[0][0] = 'No';
				$info_list[0][1] = 'items';
				$info_list[0][2] = 'found';
			}
	} catch (exception $e){
		print($e);
		$info_list[0][0] = $e;
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
