<?php
	
	require_once 'dbh.php';
sql_where('SELECT RECIPE_TITLE FROM recipe WHERE RECIPE_ID=3');
function sql_where($sql){
	global $conn;
	
    $results = mysqli_query($conn,$sql);
	$resultsCheck = mysqli_fetch_assoc($results);
	echo implode($resultsCheck);
}
?>