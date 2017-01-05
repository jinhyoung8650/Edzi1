<?php

 header("content-Type: application/json");
    $host="localhost";
    $user="root";
    $password="1";
    $dbname="member";
    $mysqli = new mysqli($host,$user,$password,$dbname);
    if ($mysqli->connect_errno) {
         die("ERROR : -> ".$DBcon->connect_error);
     }
     $id = strip_tags($_POST['id']);
     $id = $mysqli->real_escape_string($id);
     $check_id = $mysqli->query("SELECT id FROM memberinfo WHERE id='$id'");
     $count=$check_id->num_rows;

 if($count==0){
       echo json_encode(array('result'=>'success','msg'=>'등록가능합니다'));
            exit;
 }else{
       echo json_encode(array('result'=>'f','msg'=>'이미 등록되어있습니다'));
 }
?>