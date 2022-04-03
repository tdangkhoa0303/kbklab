<?php
      if (session_id() === '') {
        session_start();
        @ob_start();
      } 
?>
<!DOCTYPE html>
<html>

<head>
    <link rel="shortcut icon" href="/Resources/hmbct.png" />
</head>

<body>
    <?php
      if ($_SESSION['step'] === 3) {
        header('Location: fileupload3.php');
      } elseif ($_SESSION['step'] === 1) {
        header('Location: fileupload1.php');
      } elseif ($_SESSION['step'] !== 2) {
        header('Location: index.php');
      }
    ?>

    <div style="background-color:#c9c9c9;padding:15px;">
        <button type="button" name="mainButton" onclick="location.href='index.php';">Main Page</button>
    </div>
    <div align="center">
        <form action="" method="post" enctype="multipart/form-data">
            <br>
            <b>Select image : </b>
            <input type="file" name="file" id="file" style="border: solid;">
            <input type="submit" value="Submit" name="submit">
        </form>

        <form method="post">
            <input type="submit" name="button-check" class="button" value="Check point" />
        </form>
    </div>
    <?php
        // Check if image file is a actual image or fake image
        if(isset($_POST["submit"])) {
            $target_dir = "uploads/";
            $target_file = $target_dir . basename($_FILES["file"]["name"]);
            $uploadOk = 1;
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            $type = $_FILES["file"]["type"];

            if($type != "image/png" && $type != "image/jpeg" ){
                echo "JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }
            
            if($uploadOk == 1){
                move_uploaded_file($_FILES["file"]["tmp_name"], $target_file);
                echo "File uploaded /uploads/".$_FILES["file"]["name"];
            }
        }

		if(isset($_POST['button-check'])) {
            if (file_exists('/tmp/flag2.txt')) {
                $hostname = gethostname();
                $gateway = $_ENV['API_HOST'];
                shell_exec("curl -X PATCH '".$gateway.":7000/api/v1/scores?containerId=".$hostname."&numberSuccess=2'");
                shell_exec("rm -rf /tmp/flag*");
                shell_exec("rm -rf ./uploads/*");
                $_SESSION['step'] = 3;
                header('Location: index.php');
            }
        }
        ?>

</body>

</html>