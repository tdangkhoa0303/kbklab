<?php
  ob_start();
  if (session_id() === '') {
    session_start();
    if (!isset($_SESSION['step'])) {
      $_SESSION['step'] = 1;
    }
  } 
?>
<html>
  <head>
    <link rel="shortcut icon" href="../Resources/hmbct.png" />
    <title>Command Execution</title>
  </head>
  <body>
    <link rel="stylesheet" href="../Resources/button.css">
    <div style="background-color:#afafaf;padding:15px;border-radius:20px 20px 0px 0px;">
      <p align="center" style="font-family:'Georgia';font-size:200%">Command Execution</p>
    </div>
    <div class="button" style="background-color:#c9c9c9;padding:15px;border-radius:0px 0px 20px 20px;">
      <button class="button" type="button" name="homeB" onclick="location.href='../index.php';">Home</button>
      <?php if($_SESSION['step'] === 1) : ?>
        <button class="button" type="button" name="comex1Button" onclick="location.href='CommandExec-1.php';">Command Execution Level 1</button>
      <?php elseif($_SESSION['step'] === 2) : ?>
        <button class="button" type="button" name="comex2Button" onclick="location.href='CommandExec-2.php';">Command Execution Level 2</button>
      <?php elseif($_SESSION['step'] === 3) : ?>
        <button class="button" type="button" name="comex3Button" onclick="location.href='CommandExec-3.php';">Command Execution Level 3</button>
      <?php elseif($_SESSION['step'] === 4) : ?>
        <button class="button" type="button" name="comex4Button" onclick="location.href='CommandExec-4.php';">Command Execution Level 4</button>
      <?php endif; ?>
    </div>
  </body>
</html>
