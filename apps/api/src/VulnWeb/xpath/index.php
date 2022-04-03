<!DOCTYPE html>
<html lang="en">


	<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">

    <title>XPATH Injection </title>

    <?php require("bootstrap.php") ?>

</head>
   <body>


			<!-- Sidebar -->
 </div>
        <!-- /#sidebar-wrapper -->

      <div id="page-content-wrapper">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>XPATH Injection</h1>
                        <p>XPath Injection is an attack technique used to exploit applications that construct XPath (XML Path Language) queries from user-supplied input to query or navigate XML documents.</p>

                              <h2>More Information</h2>
	<ul>
		<li><a href="https://google.com" target="_blank">Exploiting XPATH</a></li>
		<li><a href="https://google.com.vn" target="_blank">XPATH Injection Cheatsheet</a></li>
		</ul>
                        <p><br> The below login form is using XPath to query an XML document and retrieve the account number of a user whose name and password are received from the browser.</p>


    <form action="<?php echo($_SERVER["SCRIPT_NAME"]);?>" method="GET">

        <p><label for="login">User Login:</label><br />
        <input type="text" id="login" name="login" size="20" autocomplete="off" /></p>
        <p><label for="password">User Password:</label><br />
        <input type="password" id="password" name="password" size="20" autocomplete="off" /></p>
        <button type="submit" name="form" value="submit">Submit</button>

    </form>
   </body>

 <?php


if(isset($_REQUEST["login"]) & isset($_REQUEST["password"]))
{
//take values from the HTML form
    $login = $_REQUEST["login"];
    $password = $_REQUEST["password"];


    // Loads the XML file saved in the same directory
    $xml = simplexml_load_file("accountinfo.xml");

    // Executes the XPath search
    $result = $xml->xpath("/users/user[login='" . $login . "' and password='" . $password . "']");

    if($result)
    {
        $message =  "<br>Accepted User: <b>" . ucwords($result[0]->login) . "</b><br>Your Account Number: <b>" . $result[0]->accountd . "</b>";
        echo $message;
        $hostname = gethostname();
	    $gateway = $_ENV['API_HOST'];
        shell_exec("curl -X PATCH '".$gateway.":7000/api/v1/scores?containerId=".$hostname."&numberSuccess=1'");
    }

    else
    {

        $message = "Your supplied credentials are invalid!";
	    echo $message;
    }
   }
?>
</html>
