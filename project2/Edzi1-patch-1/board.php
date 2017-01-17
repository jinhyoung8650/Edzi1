<?php
require_once("dbconfig.php");
header('Content-Type: application/json');
	$page=$_GET['pageInt'];
  if(isset($_GET['searchColumn'])) {
		$searchColumn = $_GET['searchColumn'];
		$subString = '&amp;searchColumn=' . $searchColumn;
	}
    else{
        $searchColumn = null;
        $subString = null;
    }
	if(isset($_GET['searchText'])) {
		$searchText = $_GET['searchText'];
		$subString .= '&amp;searchText=' . $searchText;
	}
    else{
        $searchText = null;
        $subString = null;
    }
	
	if(isset($searchColumn) && isset($searchText)) {
		$searchSql = ' where ' . $searchColumn . ' like "%' . $searchText . '%"';
	} else {
		$searchSql = '';
	}


    $sql = 'select count(*) as cnt from board_free' . $searchSql;
	$result = $db->query($sql);
	$row = $result->fetch_assoc();

	$allPost = $row['cnt']; //전체 게시글의 수

if(empty($allPost)){
     $emptyData = '<tr><td class="textCenter" colspan="5">글이 존재하지 않습니다.</td></tr>';
      echo json_encode(array("emtpyData"=>$emptyData));
    exit;
	}else {
		$onePage = 4; // 한 페이지에 보여줄 게시글의 수.
		$allPage = ceil($allPost / $onePage); //전체 페이지의 수
		if($page < 1 && $page > $allPage) {
             echo json_encode(array('msg'=>"존재하지않는 페이지입니다"));
           exit;
		} 

        $oneSection = 10; //한번에 보여줄 총 페이지 개수(1 ~ 10, 11 ~ 20 ...)
		$currentSection = ceil($page / $oneSection); //현재 섹션
		$allSection = ceil($allPage / $oneSection); //전체 섹션의 수
		
		$firstPage = ($currentSection * $oneSection) - ($oneSection - 1); //현재 섹션의 처음 페이지
		
		if($currentSection == $allSection) {
			$lastPage = $allPage; //현재 섹션이 마지막 섹션이라면 $allPage가 마지막 페이지가 된다.
		} else {
			$lastPage = $currentSection * $oneSection; //현재 섹션의 마지막 페이지
		}
		
		$prevPage = (($currentSection - 1) * $oneSection); //이전 페이지, 11~20일 때 이전을 누르면 10 페이지로 이동.
		$nextPage = (($currentSection + 1) * $oneSection) - ($oneSection - 1); //다음 페이지, 11~20일 때 다음을 누르면 21 페이지로 이동.
        
		$paging = '<ul class="ul">'; // 페이징을 저장할 변수
		
		//첫 페이지가 아니라면 처음 버튼을 생성
		if($page != 1){
            $paging .= '<li class="page page_start">처음</li>';
           
		}
		//첫 섹션이 아니라면 이전 버튼을 생성
		if($currentSection != 1) { 
			$paging .= '<li class="page page_prev"><a href="./index.php?page=' . $prevPage . $subString . '">이전</a></li>';
          
		}
		
		for($i = $firstPage; $i <= $lastPage; $i++) {
			if($i == $page) {
				$paging .= '<li class="page  iPage currentpage">' . $i . '</li>';
              
			} else {
				$paging .= '<li class="page  iPage">'.$i.'</li>';
                   
			}
		}
		
		//마지막 섹션이 아니라면 다음 버튼을 생성
		if($currentSection != $allSection) { 
			$paging .= '<li class="page page_next"><a href="./index.php?page=' . $nextPage . $subString . '">다음</a></li>';
            
		}
		
		//마지막 페이지가 아니라면 끝 버튼을 생성
		if($page != $allPage) { 
			$paging .= '<li class="page page_end">끝</li>';
             
		}
		$paging .= '</ul>';
    	 
		/* 페이징 끝 */
		
		
		$currentLimit = ($onePage * $page) - $onePage; //몇 번째의 글부터 가져오는지
		$sqlLimit = ' limit ' . $currentLimit . ', ' . $onePage; //limit sql 구문
		
		$sql = 'select * from board_free' . $searchSql . ' order by b_no desc' . $sqlLimit; //원하는 개수만큼 가져온다. (0번째부터 20번째까지
		$result = $db->query($sql);
    
		if(isset($emptyData)) {
          echo json_encode(array("emtpyData"=>$emptyData));
           
		 } else {
			while($row = $result->fetch_assoc())
			{      
                
                  $datetime = explode(' ', $row['b_date']);
				  $date = $datetime[0];
				  $time = $datetime[1];
                  if($date == Date('Y-m-d'))
				  $row['b_date'] = $time;
				  else
				  $row['b_date'] = $date;
                 $b_no="view.php?bno=".$row['b_no'];
				 $tr.="<tr class='tr'><td>".$row['b_no']."</td><td class='title'><a href='$b_no'>".$row['b_title']."</a></td><td>".$row['b_id']."</td><td>".$row['b_date']."</td><td>".$row['b_hit']."</td></tr>";
		        
			}
               
             
           echo json_encode(array('msg'=>$tr,'paging'=>$paging,"page"=>$page,"allPage"=>$allPage,'firstPage'=>$firstPage,"sql"=>$sql,"searchColumn"=>$searchColumn, "searchText"=>$searchText));
            
  }
					
}


?>