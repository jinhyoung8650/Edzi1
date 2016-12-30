$(document).ready(function(){
  $('#loginbtn').click(function(){
    $.ajax({
            url:'json/login.json', 
            dataTyPe:"json", 
            type:'post',
            data:$("form").serialize(),
            success:function(data){
             
            if((data['id']==$("#memid").val())){
                console.log((data['id']==$("#memid").val()));
                $("#login").html(data['id']+"님 환영합니다");
            }
            if(data['result']=='f'){ 
                      console.log("saa");
                   alert(data['msg']); 
                
                }else if(data['result']=='success'){ /* 로그인 성공시*/
                    console.log("aa");
                        alert(data['msg']);
                        $('#login').html(data['id']+'님 환영합니다');
                }
             },error: function(xhr, status, error){
                    var error_confirm=confirm('데이터 전송 오류입니다. 확인을 누르시면 페이지가 새로고침됩니다.');
                    if(error_confirm==true){
                        console.log("saa");
                        document.location.reload();
                    }
                }   
        })     
        return false;
    });
    
    });