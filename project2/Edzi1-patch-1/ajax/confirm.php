<?php
 require_once("dbconnect.php");
 header("content-Type: application/json");
   
     $id = strip_tags($_POST['id']);
     $id = $mysqli->real_escape_string($id);
     $check_id = $mysqli->query("SELECT id FROM memberinfo WHERE id='$id'");
     $count=$check_id->num_rows;
     if(empty($id)){
            echo json_encode(array('result'=>'f','msg'=>'공백을 채워주세요'));
            exit;
     }
     
     if(!(strlen($_POST['id'])>5&&strlen($_POST['id']<12))){
             echo json_encode(array('result'=>'f','msg'=>'5~12자 내외로 입력해주세요'));
             exit;
     }
     
     if(!ctype_alnum($id)){
         echo json_encode(array('result'=>'f','msg'=>'영문자,숫자로 입력해주세요'));
             exit;
     }
 if($count==0){
       echo json_encode(array('result'=>'success','msg'=>'등록가능합니다'));
            exit;
 }else{
       echo json_encode(array('result'=>'f','msg'=>'이미 등록되어있습니다'));
 }
?>