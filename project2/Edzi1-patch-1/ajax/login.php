
   <?php
    // 일반 페이지에서 넘어왔을 시  차단
    header('Content-Type: application/json');
    
    $host="localhost";
    $user="root";
    $password="1";
    $dbname="member";
    $mysqli = new mysqli($host,$user,$password,$dbname);
    if ($mysqli->connect_errno) {
         die("ERROR : -> ".$DBcon->connect_error);
     }
    $id=strip_tags($_POST['id']);
    $pw=strip_tags($_POST['pw']);
     
    $query  = $mysqli->query("select id, pw from memberinfo where id='$id'");
    $row    = $query->fetch_array();
    $count  = $query->num_rows;

    if($pw==$row['pw']&&$count==1){
        
        echo json_encode(array('result'=>'success','msg'=>'로그인에 성공하였습니다.','id'=>$_POST['id']));
        exit;
       
    } 

    if(!isset($_POST['ACCESS'])){
            echo json_encode(array('ACCESS'=>'denied'));
            exit;
    }

    // 아이디 또는 비밀번호를 입력하지 않았을 시 
    if(empty($_POST['id'])||empty($_POST['pw'])){
            echo json_encode(array('result'=>'f','msg'=>'아이디 또는 비밀번호를 입력해주세요'));
            exit;
    }

    // 데이터베이스값을 대체하는 변수  


    // 아이디 불일 치시 
   if($id!=$row['id']){
            echo json_encode(array('result'=>'f','msg'=>'아이디가 일치하지 않습니다.'));
            exit;
    }

    // 비밀번호 불일치 시 
   if($pw!=$row['pw']){
            echo json_encode(array('result'=>'f','msg'=>'비밀번호 일치하지 않습니다.'));
            exit;
    }

    // 로그인이 성공했을 시 
   
?>