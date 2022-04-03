<?php
      if (session_id() === '') {
        session_start();
        @ob_start();
        if (!isset($_SESSION['step'])) {
          $_SESSION['step'] = 1;
        }
      } 
?>
<!DOCTYPE html>
<html>

<head>
    <link rel="shortcut icon" href="/Resources/hmbct.png" />
    <title> File Upload </title>
</head>

<body>
    <link rel="stylesheet" href="/Resources/button.css">
    <div style="background-color:#afafaf;padding:15px;border-radius:20px 20px 0px 0px;">
        <p align="center" style="font-family:'Georgia';font-size:200%">File Upload</p>
    </div>
    <div class="button" style="background-color:#c9c9c9;padding:15px;border-radius:0px 0px 20px 20px;">
        <button class="button" type="button" name="homeB" onclick="location.href='index.php';">Home</button>
        <?php if($_SESSION['step'] === 1) : ?>
        <button class="button" type="button" name="Button1" onclick="location.href='fileupload1.php';">File Upload Level
            1</button>
        <?php elseif($_SESSION['step'] === 2) : ?>
        <button class="button" type="button" name="Button2" onclick="location.href='fileupload2.php';">File Upload Level
            2</button>
        <?php elseif($_SESSION['step'] === 3) : ?>
        <button class="button" type="button" name="Button3" onclick="location.href='fileupload3.php';">File Upload Level
            3</button>
        <?php endif; ?>
    </div>
    </link>
</body>

</html>