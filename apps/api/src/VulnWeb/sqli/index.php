<?php 
	include_once 'includes/dbh.php';
?>

<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" type="text/css" href="whygod.css">
<script type='text/javascript' src="jquery-3.3.1.min.js"></script>
<script type='text/javascript' src="index.js"></script>
<script src="//code.jquery.com/jquery-1.12.4.js"></script>
<script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body id='body-'>
	<div id='box-boi'>
		<div id='recipe_entry_box'>
			<form id='recipe_entry' action='includes/upRecipe.php' method='POST' class='grid'>
				<div class='box-input'>
					<h3> Login </h3>
					<input class='apply' id='ci' type="text" name='username' placeholder='username'>
					<a href=''>Forgot password</a>
					<input class='apply' id='ci1' type="password" name='password' placeholder="password">
					<button class='apply' id='login' type='Submit' name='submit'>Login</button>
					<input style='margin:0px;	margin-left:80px;	display:inline;' type="checkbox" id='check-box'>
					<label for='check-box'	style='font-weight:bold;'>Keep me signed in</label>
					<button class='apply' id='signup'> Make New Account </button>
				</div>
			</form>
		</div>
		<div id='printchatbox' style='display:none'>
			<div class='chatbox-box' style='justify-items:center;' ><img style='height:15px; padding-top:5px;' src="images/cmd.png"><p id='oo'>C:\1337\350\wow.exe</p></div>
			<div class='pp' >
				<p> SELECT ____, <br>FROM ______, <br>WHERE _____ =' </p>
				<p id='username'></p>
				<p>' AND _______=' '</p>
			</div>
		</div>
	</div>
	<div id='butt-box'>
		<div id='top-bar'>
		<button id='enhance'>O</button>
	</div>
	<script>
		$(document).ready(function(){
			// $("#printchatbox").hide()
			
			$('#enhance').click(function(){
				$("#recipe_entry_box").fadeOut(1000).fadeIn(1000)
				$("#butt-box").fadeOut(1000).delay(1000)
				window.setTimeout(partB,1000);
				
				
			})
			function partB(){
				// $("#recipe_entry_box").delay(1000).fadeIn(1000)
				$("html").animate({backgroundColor: '#1a1a00'}, 1000);
				$("#recipe_entry_box").animate({backgroundColor: 'white'}, 1000);
				var p = $("#box-boi").css("display", "grid").fadeIn(1000);
				// var p = $("html").css("background-color", "#1f1f2e")
				// p.delay(1000).hide().delay(1000).show(1000);
				
				$("#printchatbox").delay(1000).fadeIn(1000)
			
				
				// document.getElementById('box-boi').style.display='grid'
				
				// var p = $("html").css("background-color", "#1f1f2e")
			// var text-info =document.getElementById('username').innerHTML
			
			// if (text-info.includes('hello'))> -1){
				// console.log('HELLO')
			// }
			
			}
			
			
		})
	</script>
	
	
	<script> 
		
		

			var inputBox = document.getElementById('ci');

				inputBox.onkeyup = function(){
					document.getElementById('username').innerHTML = inputBox.value;
			}

		var inputBox1 = document.getElementById('ci1');

			inputBox1.onkeyup = function(){
				document.getElementById('password').innerHTML = inputBox.value;
		}

	
	</script>
	<br>
	<br>
	 

	<?php

		// "SELECT user_id FROM users WHERE user_name='$un' AND user_password='$password' LIMIT 1"


		if (isset($_GET['message'])) {  
				$temp=$_GET['message'];
				echo "<script>console.log(alert('$temp'))</script>";
			
	}

	?>

</body>


</html>