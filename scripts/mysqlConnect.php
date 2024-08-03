<?php
   $dbName = "localhost";
   $dbUser = "root";
   $dbPassword = "qwerty";
   $dbBaseName = "Tetris";
   $dbTableName = "Scores";

   $conn = new mysqli($dbName,$dbUser,$dbPassword);

   if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
  }
  echo "Last ID is : " $conn->insert_id;
?>
