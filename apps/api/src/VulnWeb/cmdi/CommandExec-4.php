<?php
  ob_start();
  if (session_id() === ''){
    session_start();}
  if ($_SESSION['step'] === 1) {
    header('Location: CommandExec-1.php');
  } elseif ($_SESSION['step'] === 2) {
    header('Location: CommandExec-2.php');
  } elseif ($_SESSION['step'] === 3) {
    header('Location: CommandExec-3.php');
  } elseif ($_SESSION['step'] !== 4) {
    header('Location: index.php');
  }
?>
<html>
  <head>
    <link rel="shortcut icon" href="../Resources/hmbct.png" />
    <title>CommandExec-4</title>
  </head>
  <body>
    <div style="background-color:#afafaf;padding:15px;border-radius:20px 20px 0px 0px">
      <button type="button" name="homeButton" onclick="location.href='index.php';">Home Page</button>
    </div>
    <div style="background-color:#c9c9c9;padding:20px;">
      <h1 align="center">Browse The Files!</h1>
    <form align="center" action="CommandExec-4.php" method="$_GET">
      What's it:
      <input type="text" name="typeBox" value=""><br>
      <input type="submit" value="Submit">
    </form>
  </div>
  <div style="background-color:#ecf2d0;padding:20px;border-radius:0px 0px 20px 20px" align="center">
    <?php
    if(!file_exists(".hidden")){
      mkdir(".hidden");
      exec("echo \"flag:secret\" > .hidden/log4.txt");
      if(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN'){
        exec("attrib +h .hidden");
      }
    }
    if(isset($_GET["typeBox"])){
      $target =$_GET["typeBox"];
      $substitutions = array(
        '&&'=>'',
        '& ' => '',
        '&& ' => '',
        ';'  => '',
        '|' => '',
        '-'  => '',
        '$'  => '',
        '('  => '',
        ')'  => '',
        '`'  => '',
        '||' => ''
      );
      $target = str_replace(array_keys($substitutions),$substitutions,$target);
      echo $target."<br>";
      echo shell_exec($target);
      if($_GET["typeBox"] == "secret") {
        echo "You really found my secret!";
      }
        
      // Check file exist
      if (file_exists('/tmp/flag4.txt')) {
        $hostname = gethostname();
        $gateway = $_ENV['API_HOST'];
        shell_exec("curl -X PATCH '".$gateway.":7000/api/v1/scores?containerId=".$hostname."&numberSuccess=4'");
        shell_exec("rm -rf /tmp/flag*");
        $_SESSION['step'] = 5;
        header('Location: index.php');
      }
    }

    ?>
  </div>
  </body>
</html>
