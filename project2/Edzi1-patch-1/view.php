<?php
	require_once("dbconfig.php");
	$bNo = $_GET['bno'];

	if(!empty($bNo) && empty($_COOKIE['board_free_' . $bNo])) {
		$sql = 'update board_free set b_hit = b_hit + 1 where b_no = ' . $bNo;
		$result = $db->query($sql); 
		if(empty($result)) {
			?>
			<script>
				alert('오류가 발생했습니다.');
				history.back();
			</script>
			<?php 
		}
	}
	$sql = 'select b_title, b_content, b_date, b_hit, b_id from board_free where b_no = ' . $bNo;
	$result = $db->query($sql);
	$row = $result->fetch_assoc();
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8" />
	<title>후기게시판 | The Edzi</title>
	<link href="css/normalize.css" rel="stylesheet">
	<link href="css/view.css?ver=6" rel="stylesheet">
	<link href="css/Header.css" rel="stylesheet">
    <link href="css/Footer.css" rel="stylesheet">
    <link href="css/TheEdzi.css" rel="stylesheet">
	<script src="js/jquery-2.1.3.min.js"></script>
</head>
<body>
    <header>
        <div id="logobar">
            <a id="logo" href="#">The Edzi</a>
            <div id="monotext">본 페이지는 포트폴리오용으로 제작한 사이트입니다</div>
        </div>
    </header>
    
	<article class="boardArticle">
		<h3>후기게시판</h3>
		<div id="boardView">
			<h3 id="boardTitle">제목 : <?php echo $row['b_title'] ?></h3>
			<div id="boardInfo">
				<span id="boardID">작성자 : <?php echo $row['b_id'] ?></span><br>
				<span id="boardDate">작성일 : <?php echo $row['b_date'] ?></span>
				<span id="boardHit">조회 : <?php echo $row['b_hit'] ?></span>
			</div>
			<div id="boardContent"><?php echo $row['b_content'] ?></div>
			<div class="btnSet">
				<a href="write.php?bno=<?php echo $bNo?>">수정</a>
				<a href="delete.php?bno=<?php echo $bNo?>">삭제</a>
				<a href="index.php">목록</a>
            </div><br><hr>
			<span>댓글</span>
		<div id="boardComment">
			<?php require_once('comment.php')?>
		</div>
		</div>
	</article>
	
	<footer>
        <span>
            <hr>
            <h1>INFORMATION</h1>
        </span>
        <address>
            본 페이지는 포트폴리오용으로 제작된 페이지입니다.<br>
            제작자 e-mail<br>
            김진형 : dmdnt11@naver.com<br>
            송근도 : rmseh9900@naver.com
        </address>
    </footer>
</body>
</html>