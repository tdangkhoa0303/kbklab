<?php
    $dbServername = $_ENV['DB_HOST'];
    $dbUsername = $_ENV['DB_USER'];
    $dbPassword = $_ENV['DB_PASSWORD'];
    $dbName = $_ENV['DB_NAME'];

    $conn = mysqli_connect($dbServername,$dbUsername,$dbPassword,$dbName);

