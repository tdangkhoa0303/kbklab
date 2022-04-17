<?php session_start(); ?>
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" type="text/css" href="whygod2.css">
<script type='text/javascript' src="jquery-3.3.1.min.js"></script>
<script type='text/javascript' src='main.js'></script>
<script type='text/javascript' src='effect.js'></script>
<title>Recipe</title>
	<?php
	if (isset($_GET['message'])) {  
			$temp=$_GET['message'];
			echo "<script>console.log(alert('$temp'))</script>";
		
}
		require_once 'includes/dbh.php';
		// require_once 'includes/recipeLookUP.php';
		


    if (isset($_SESSION['message'])) {
       $info_list=$_SESSION['message'];
       unset($_SESSION['message']);
    }
	?>
</head>
<body>
	<div class='ruler-box'>
		<form id='recipe_entry' action='includes/recipeLookUp.php' method='POST' class='grid'>
			<input class='ele' id='fl' type="text" name='search' >
			<button class='ele' style='background-color:white;' id='search' type='Submit' name='submit'>search</button>
		</form>
		<div class='table-list'>
			<table id='table-item' style="width:auto">
				<tr id='wowie'>
					<th>Item id</th>
					<th>Item name</th> 
					<th>Item amount</th>
				</tr>
			</table>
		</div>
	</div>
		<div id='printchatbox' style='display:none;'>
			<div class='chatbox-box' style='justify-items:center;' ><img style='height:15px; padding-top:5px;' src="images/cmd.png"><p id='oo'>C:\1337\350\wow.exe</p></div>
			<div class='pp' >
				<p> SELECT ____, <br>FROM ______, <br>WHERE _____ = LIKE </p>
				<p style='display:inline;'>'% </p><p id='search-q' style='display:inline;'></p><p style='display:inline;'> %'</p>
				
			</div>
		</div>
	</div>
	<div class='item-container'>
	</div>
	<script>//SELECT id , test_name , test_amount FROM test_table WHERE test_name LIKE '%$wow%'
		var inputBox = document.getElementById('fl');
		inputBox.onkeyup = function(){
			document.getElementById('search-q').innerHTML = inputBox.value;
		}
	</script>
	
	<script type="text/javascript">
	$(document).ready(function(){
		var info_list = <?php echo json_encode($info_list) ?>;
		for(i=0;info_list.length>i;i++){
				$('#table-item').append("<tr><td>"+info_list[i][0]+"</td><td>"+info_list[i][1]+"</td><td>"+info_list[i][2]+"</td></tr>");
		}
		
	}) 
	</script>
</body>
</html>