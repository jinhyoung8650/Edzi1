<?php
   $host="localhost";
    $user="root";
    $password="1";
    $dbname="member";
    $mysqli = new mysqli($host,$user,$password,$dbname);
    if ($mysqli->connect_errno) {
         die("ERROR : -> ".$DBcon->connect_error);
     }

     $id = strip_tags($_POST['id']);
     $pw = strip_tags($_POST['pw']);
     
    
     $check_id = $mysqli->query("SELECT id FROM memberinfo WHERE id='$id'");
     $count=$check_id->num_rows;
   
     if(!isset($_POST['ACCESS'])){
            exit;
        }
     if($count==0){
         $insert_query ="INSERT INTO memberinfo(id,pw)
         VALUES('$id','$pw')";
         mysqli_query($mysqli,$insert_query);
         echo "성공적으로등록";
     }else{
         echo "존재함";
     }
   $mysqli->close();
?>
