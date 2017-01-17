<?php
    require_once("dbconnect.php");
    header('Content-Type: application/json');
   
     $id = strip_tags($_POST['id']);
     $pw = strip_tags($_POST['pw']);
     $id = $mysqli->real_escape_string($id);
     $pw = $mysqli->real_escape_string($pw);
    
     $check_id = $mysqli->query("SELECT id FROM memberinfo WHERE id='$id'");
     $count=$check_id->num_rows;
   
     if(!isset($_POST['ACCESS'])){
            exit;
        }
     if($count==0){
         $insert_query ="INSERT INTO memberinfo(id,pw)
         VALUES('$id','$pw')";
         mysqli_query($mysqli,$insert_query);
       
    
     }
   echo json_encode(array('result'=>'success','msg'=>'등록되었습니다'));
   $mysqli->close();
?>
