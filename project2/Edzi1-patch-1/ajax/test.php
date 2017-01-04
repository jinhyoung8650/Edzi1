<?php

echo "<h3>aaa3212312313a</h3>";

error_reporting(E_ALL);
error_reporting(E_ALL | E_STRICT);
$host="localhost";
$user="root";
$password="1";
$dbname="member";
$mysqli = new mysqli($host,$user,$password,$dbname);

 if ($mysqli->connect_errno) {
         die("ERROR : -> ".$DBcon->connect_error);
     }




echo print_r($mysqli);

$mysqli->close();

/* $db_connect = mysqli_connect("localhost","join","1");
 $db="select *from member";
 $result=($db,$db_connect);
 $count=mysql_num_fields($result);
    if($db_connect){
         echo  print_r($count);
         echo "<br>aa";
    }
    mysql_close($db_connect);*/
?>
    