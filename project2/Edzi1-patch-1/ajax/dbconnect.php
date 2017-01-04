 <?php
    $host="localhost";
    $user="root";
    $password="1";
    $dbname="member";
    $mysqli = new mysqli($host,$user,$password,$dbname);
    if ($mysqli->connect_errno) {
         die("ERROR : -> ".$DBcon->connect_error);
     }
  
?>