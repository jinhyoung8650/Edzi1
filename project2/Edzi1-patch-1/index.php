<?php
	require_once("dbconfig.php");
	
	/* 페이징 시작 */
	//페이지 get 변수가 있다면 받아오고, 없다면 1페이지를 보여준다.
	if(isset($_GET['page'])) {
		$page = $_GET['page'];
	} else {
		$page = 1;
	}
	
	/* 검색 시작 */
	
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
	
	/* 검색 끝 */
	
	$sql = 'select count(*) as cnt from board_free' . $searchSql;
	$result = $db->query($sql);
	$row = $result->fetch_assoc();
	
	$allPost = $row['cnt']; //전체 게시글의 수
	
	if(empty($allPost)) {
		$emptyData = '<tr><td class="textCenter" colspan="5">글이 존재하지 않습니다.</td></tr>';
        $paging = null;
	} else {

		$onePage = 10; // 한 페이지에 보여줄 게시글의 수.
		$allPage = ceil($allPost / $onePage); //전체 페이지의 수
		if($page < 1 && $page > $allPage) {
?>
			<script>
				alert("존재하지 않는 페이지입니다.");
				history.back();
			</script>
<?php
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
        
		$paging = '<ul>'; // 페이징을 저장할 변수
		
		//첫 페이지가 아니라면 처음 버튼을 생성
		if($page != 1){
			$paging .= '<li class="page page_start"><a href="./index.php?page=1' . $subString . '">처음</a></li>';
		}
		//첫 섹션이 아니라면 이전 버튼을 생성
		if($currentSection != 1) { 
			$paging .= '<li class="page page_prev"><a href="./index.php?page=' . $prevPage . $subString . '">이전</a></li>';
		}
		
		for($i = $firstPage; $i <= $lastPage; $i++) {
			if($i == $page) {
				$paging .= '<li class="page current">' . $i . '</li>';
			} else {
				$paging .= '<li class="page"><a href="./index.php?page=' . $i . $subString . '">' . $i . '</a></li>';
			}
		}
		
		//마지막 섹션이 아니라면 다음 버튼을 생성
		if($currentSection != $allSection) { 
			$paging .= '<li class="page page_next"><a href="./index.php?page=' . $nextPage . $subString . '">다음</a></li>';
		}
		
		//마지막 페이지가 아니라면 끝 버튼을 생성
		if($page != $allPage) { 
			$paging .= '<li class="page page_end"><a href="./index.php?page=' . $allPage . $subString . '">끝</a></li>';
		}
		$paging .= '</ul>';
		
		/* 페이징 끝 */
		
		
		$currentLimit = ($onePage * $page) - $onePage; //몇 번째의 글부터 가져오는지
		$sqlLimit = ' limit ' . $currentLimit . ', ' . $onePage; //limit sql 구문
		
		$sql = 'select * from board_free' . $searchSql . ' order by b_no desc' . $sqlLimit; //원하는 개수만큼 가져온다. (0번째부터 20번째까지
		$result = $db->query($sql);
	}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>The Edzi, 더 엣지있게, 프리미엄 의류 대여 샵</title>
    <script src="https://code.jquery.com/jquery-1.8.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.0/jquery-ui.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
<!--    <link href="css/custom_bootstrap.css" rel="stylesheet">-->
    <link href="css/normalize.css" rel="stylesheet">
    <link href="css/Header.css" rel="stylesheet">
    <link href="css/TheEdzi.css" rel="stylesheet">
    <link href="css/ThirdPart.css" rel="stylesheet">
    <link href="css/review.css" rel="stylesheet">
<!--    <link href="css/board.css" rel="stylesheet">-->
  
    <script type="text/javascript" src="js/Framework.js"></script>
    <script type="text/javascript" src="js/remote.js"></script>
    <script type="text/javascript" src="js/login.js"></script>
    <script type="text/javascript" src="js/Edzi.js"></script>
    <script type="text/javascript" src="js/write.js"></script>
    <script type="text/javascript" src="js/View.js"></script>
</head>
<body>
   
<!-- ***************헤더 부분*************** -->

    <header>
       <div id="fbar">
            <form action="ajax/login.php" id="loginForm" name="form_ajax" method="post"
                  onsubmit="return loginform(this)">
                <input type="hidden" name="ACCESS" value="true">아이디
                <input type="text" id="id" name="id" value="">/비밀번호 
                <input type="password" id="pw" name="pw">
                <input type="submit" id="loginsubmit" value="로그인">
                <button id="membtn"><a href="JoinMember.html">회원가입</a></button>
            </form>
        </div>
        <div id="logobar">
            <a id="logo" href="http://www.naver.com">The Edzi</a>
            <div id="monotext">본 페이지는 포트폴리오용으로 제작한 사이트입니다</div>
        </div>
        <script>
            var sss="";
            console.log(typeof(sss));
            console.log(typeof(sessionStorage.getItem('id')));
            var ss=sessionStorage.getItem('id');
            console.log(typeof(ss));
        </script>
    </header>
    
<!-- ***************1번째 부분*************** -->
    

    <section id="sec1" class="sec">
        <div class="fwin" id="cuca">
            <div id="logotitle">
                <hr>
                <h1>L O G O</h1>
            </div>
            <div id="imglogo">
                <img id="imgcuca" src="img/cuca1.png" alt="Choice us&Choice all">
            </div>
        </div>
        <div class="fwin" id="belief">
            <div id="beliefbox">
                <hr>
                <h1 id="headline">설립 이념</h1>
            </div>
            <div id="mind" class="things">
                <span>
                    <h3>설립 배경</h3>
                    <hr>
                </span>
                <p id="mind_in">
                    우리 The Edzi가 설립된 배경은 간단합니다. 옷은 우리 삶에서 빼놓을 수 없기 때문이죠. 옷이 몸을 가리는
                    기능만을 위한 시대는 지났습니다. 우리는 옷을 입는 데 신중합니다. 물론, 어제와는 다르게요. 하지만 선택이
                    곤란할 때가 있습니다. 가지고 있는 옷의 수도 제한적이죠. 시즌별로 유행별로 옷은 계속해서 나오고 바뀝니다.
                    그 모든 걸 쫓아서 구매하기에는 지갑이 곤란해하죠. 모든 것을 소유하기엔 무리가 있습니다. 그러니까 우리
                    The Edzi를 이용하세요. 만족을 약속합니다.
                </p>
            </div>
            <div id="purpose" class="things">
                <span>
                    <h3>설립 목적</h3>
                    <hr>
                </span>
                <ul id="purpose_in">
                    <li>개성을 당연시 여기고 존중받는 사회, 그 개성을 더 발전시켜주기 위해</li>
                    <li>모두가 이용할 수 있는 세계에서 가장 큰 옷장이 되기 위해</li>
                    <li>금액에 대한 부담을 줄이고 선택의 폭을 넓혀주기 위해</li>
                    <li>당장 오늘 무엇을 입을지에 대한 고민을 덜어주기 위해</li>
                    <li>일정 횟수 이상을 대여한 옷은 기부를 통한 사회에 환원을 위해</li>
                </ul>
            </div>
            <div id="case" class="things">
                <span>
                    <h3>이럴 때 찾아오세요</h3>
                    <hr>
                </span>
                <ul id="case_in">
                    <li>옷장은 꽉 찼지만 입을 옷이 없을 때</li>
                    <li>색다른 옷을 입어보고 싶을 때</li>
                    <li>코디는 맞췄는데 옷을 사러 갈 시간이 없을 때</li>
                    <li>실제로 이 옷이 나한테 잘 어울릴지 입어보고 싶을 때</li>
                </ul>
            </div>
            <div class="imgs">
                <img src="img/logo2.png" id="imglogo1" alt="로고 이미지">
            </div>
            <div class="imgs">
                <img src="img/using.png" id="using1" alt="이미지">
            </div>
        </div>
    </section>
    
<!-- ***************2번째 부분*************** -->
   
    <section id="sec2" class="sec">
        <div id="headname">
            <hr>
            <h1>CATEGORY</h1>
        </div>
        <div id="leftbtn" class="btns"><a><img src="img/line_left1.png" alt="왼쪽 버튼"></a></div>
        <div id="leftbtnred" class="btns"><a><img src="img/line_left_red1.png" alt="왼쪽 버튼"></a></div>
        <div id="rightbtn" class="btns"><a><img src="img/line_right1.png" alt="오른쪽 버튼"></a></div>
        <div id="rightbtnred" class="btns"><a><img src="img/line_right_red1.png" alt="오른쪽 버튼"></a></div>
        <div id="menu">
            <hr>
            <ul id="topmenu">
                <li id="tm1" class="tms"><a href="#" class="kor">탑</a><a href="#" class="eng">TOP</a>
                    <ul class="smallmenu" id="sm1">
                        <li><a href="#">라운드넥</a></li>
                        <li><a href="#">브이넥</a></li>
                        <li><a href="#">나시</a></li>
                        <li><a href="#">폴라/터틀넥</a></li>
                        <li><a href="#">니트티</a></li>
                    </ul>
                </li>
                <li id="tm2" class="tms"><a href="#" class="kor">블라우스</a><a href="#" class="eng">BLOUSE</a>
                    <ul class="smallmenu" id="sm2">
                        <li><a href="#">블라우스</a></li>
                        <li><a href="#">셔츠</a></li>
                    </ul>
                </li>
                <li id="tm3" class="tms"><a href="#" class="kor">니트&가디건</a><a href="#" class="eng">KNIT & CARDIGAN</a>
                    <ul class="smallmenu" id="sm3">
                        <li><a href="#">니트</a></li>
                        <li><a href="#">가디건</a></li>
                        <li><a href="#">조끼</a></li>
                    </ul>
                </li>
                <li id="tm4" class="tms"><a href="#" class="kor">팬츠</a><a href="#" class="eng">PANTS</a>
                    <ul class="smallmenu" id="sm4">
                        <li><a href="#">스키니</a></li>
                        <li><a href="#">레깅스</a></li>
                        <li><a href="#">청바지</a></li>
                        <li><a href="#">반바지</a></li>
                    </ul>
                </li>
                <li id="tm5" class="tms"><a href="#" class="kor">원피스</a><a href="#" class="eng">ONEPIECE</a>
                    <ul class="smallmenu" id="sm5">
                        <li><a href="#">원피스</a></li>
                        <li><a href="#">스커트</a></li>
                    </ul>
                </li>
                <div id="libtn"><img src="img/btm_button.png"></div>
            </ul>
            <hr>
            <div id="libox">
                <div class="li_element">
                    <a href="#">라운드넥</a><br>
                    <a href="#">브이넥</a><br>
                    <a href="#">나시</a><br>
                    <a href="#">폴라/터틀넥</a><br>
                    <a href="#">니트티</a>
                </div>
                <div class="li_element">
                    <a href="#">블라우스</a><br>
                    <a href="#">셔츠</a>
                </div>
                <div class="li_element">
                    <a href="#">니트</a><br>
                    <a href="#">가디건</a><br>
                    <a href="#">조끼</a>
                </div>
                <div class="li_element">
                    <a href="#">스키니</a><br>
                    <a href="#">레깅스</a><br>
                    <a href="#">청바지</a><br>
                    <a href="#">반바지</a>
                </div>
                <div class="li_element">
                    <a href="#">원피스</a><br>
                    <a href="#">스커트</a>
                </div>
            </div>
        </div>
        <div id="imgcal">
            <ul id="calcap">
                <li id="cal1" class="cals"><img src="img/cal1.jpg" alt="이미지1" class="calimgs"></li>
                <li id="cal2" class="cals"><img src="img/cal2.jpg" alt="이미지2" class="calimgs"></li>
                <li id="cal3" class="cals"><img src="img/cal3.jpg" alt="이미지3" class="calimgs"></li>
                <li id="cal4" class="cals"><img src="img/cal4.jpg" alt="이미지4" class="calimgs"></li>
                <li id="cal5" class="cals"><img src="img/cal5.jpg" alt="이미지5" class="calimgs"></li>
            </ul>
        </div>
        <div id="dotm">
            <div class="dots" id="dot1">0</div>
            <div class="dots" id="dot2">1</div>
            <div class="dots" id="dot3">2</div>
            <div class="dots" id="dot4">3</div>
            <div class="dots" id="dot5">4</div>
        </div>
    </section>
    
<!-- ***************3번째 부분*************** -->
    
    <section id="sec3" class="sec">
        <span id="big_title">
            <hr>
            <h1>HOT ITEM</h1>
        </span>
        <section id="pro_sec1" class="product_section">
            <span class="product_title">
                <hr>
                <h2>WOMEN'S BEST</h2>
            </span>
            <article>
                <ul>
                    <li class="product_li">
                        <div class="product_div">
                            <figure class="product_figure">
                                <a href="#">
                                    <img src="img/w_clothes1.jpg" alt="a">
                                    <span><strong>마쥬 더블 울코트</strong></span><br>
                                    <span>소비자 가격 : </span><span class="tags">68500원</span><br>
                                    <span>판매 가격 : 47900원</span>
                                </a>
                                <figcaption><a href="#">30% 할인</a></figcaption>
                            </figure>
                            <a class="tap_text" href="#">30% 할인</a>
                        </div>
                    </li>
                    
                    <li class="product_li">
                        <div class="product_div">
                            <figure class="product_figure">
                                <a href="#">
                                    <img src="img/w_clothes2.jpg" alt="a">
                                    <span><strong>코엘 일자 정장 팬츠</strong></span><br>
                                    <span>소비자 가격 : </span><span class="tags">54000원</span><br>
                                    <span>판매 가격 : 37800원</span>
                                </a>
                                <figcaption><a href="#">30% 할인</a></figcaption>
                            </figure>
                            <a class="tap_text" href="#">30% 할인</a>
                        </div>
                    </li>
                    
                    <li class="product_li">
                        <div class="product_div">
                            <figure class="product_figure">
                                <a href="#">
                                    <img src="img/w_clothes3.jpg" alt="a">
                                    <span><strong>테디 반폴라 니트 조끼</strong></span><br>
                                    <span>소비자 가격 : </span><span class="tags">34500원</span><br>
                                    <span>판매 가격 : 27600원</span>
                                </a>
                                <figcaption><a href="#">20% 할인</a></figcaption>
                            </figure>
                            <a class="tap_text" href="#">20% 할인</a>
                        </div>
                    </li>
                    
                </ul>
            </article>
        </section>
        
        <section id="pro_sec2" class="product_section">
            <span class="product_title">
                <hr>
                <h2>MEN'S BEST</h2>
            </span>
            <article>
                <ul>
                    <li class="product_li">
                        <div class="product_div">
                            <figure class="product_figure">
                                <a href="#">
                                    <img src="img/m_clothes1.jpg" alt="a">
                                    <span><strong>에리슬 오버핏 폴라니트</strong></span><br>
                                    <span>소비자 가격 : </span><span class="tags">37900원</span><br>
                                    <span>판매 가격 : 28400원</span>
                                </a>
                                <figcaption><a href="#">25% 할인</a></figcaption>
                            </figure>
                            <a class="tap_text" href="#">25% 할인</a>
                        </div>
                    </li>
                    
                    <li class="product_li">
                        <div class="product_div">
                            <figure class="product_figure">
                                <a href="#">
                                    <img src="img/m_clothes3.jpg" alt="a">
                                    <span><strong>슬로우 생지 데님팬츠</strong></span><br>
                                    <span>소비자 가격 : </span><span class="tags">25900원</span><br>
                                    <span>판매 가격 : 18000원</span>
                                </a>
                                <figcaption><a href="#">30% 할인</a></figcaption>
                            </figure>
                            <a class="tap_text" href="#">30% 할인</a>
                        </div>
                    </li>
                    
                    <li class="product_li">
                        <div class="product_div">
                            <figure class="product_figure">
                                <a href="#">
                                    <img src="img/m_clothes2.jpg" alt="a">
                                    <span><strong>센즈빈 골덴 양털자켓</strong></span><br>
                                    <span>소비자 가격 : </span><span class="tags">39000원</span><br>
                                    <span>판매 가격 : 31200원</span>
                                </a>
                                <figcaption><a href="#">20% 할인</a></figcaption>
                            </figure>
                            <a class="tap_text" href="#">20% 할인</a>
                        </div>
                    </li>
                    
                </ul>
            </article>
        </section>
    </section>
    
<!-- ***************4번째 부분**************** -->
   
    <section id="sec4">
		<h3>후기게시판</h3>
		<div id="boardList">
			<table>
<!--				<caption class="readHide">자유게시판</caption>-->
				<thead>
					<tr>
						<th scope="col" class="no">번호</th>
						<th scope="col" class="title">제목</th>
						<th scope="col" class="author">작성자</th>
						<th scope="col" class="date">작성일</th>
						<th scope="col" class="hit">조회</th>
					</tr>
				</thead>
				<tbody>
						<?php
						if(isset($emptyData)) {
							echo $emptyData;
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
						?>
						<tr>
							<td class="no"><?php echo $row['b_no']?></td>
							<td class="title">
								<a href="view.php?bno=<?php echo $row['b_no'] ?>"><?php echo $row['b_title'] ?></a>
							</td>
							<td class="author"><?php echo $row['b_id'] ?></td>
							<td class="date"><?php echo $row['b_date'] ?></td>
							<td class="hit"><?php echo $row['b_hit'] ?></td>
						</tr>
						<?php
							}
						}
						?>
				</tbody>
			</table>
			<div class="btnSet">
				<a href="write.php" class="btnWrite btn" id="write">글쓰기</a>
			</div>
			<div class="paging">
				<?php echo $paging ?>
			</div>
			<div class="searchBox">
				<form action="./index.php" method="get">
					<select name="searchColumn">
						<option <?php echo $searchColumn=='b_title'?'selected="selected"':null?> value="b_title">제목</option>
						<option <?php echo $searchColumn=='b_content'?'selected="selected"':null?> value="b_content">내용</option>
						<option <?php echo $searchColumn=='b_id'?'selected="selected"':null?> value="b_id">작성자</option>
					</select>
					<input type="text" name="searchText" value="<?php echo isset($searchText)?$searchText:null?>">
					<button type="submit">검색</button>
				</form>
			</div>
		</div>
	</section>
    
<!-- ***************풋터 부분*************** -->
    
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