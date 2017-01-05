 function loginform(info){
    
    $.ajax({
            url:$(info).attr("action"), 
            dataTyPe:"json", 
            type:$(info).attr('method'),
            data:$(info).serialize(),
            success:function(data){
             
            if(data['result']=='f'){ 
                      console.log("saa");
                   alert(data['msg']); 
                
                }else if(data['result']=='success'){ /* 로그인 성공시*/
                       
                 
                        $("#loginForm").detach();
                        $('#fbar').append("<div id='loginState' style=display: inline-block;'>"+data['id']+'님'+"<button id='logout'>로그아웃</button>"+"</div>");
                       
                        
                }
             },error: function(xhr, status, error){
                    var error_confirm=confirm('데이터 전송 오류입니다. 확인을 누르시면 페이지가 새로고침됩니다.');
                    if(error_confirm==true){
                       
                        document.location.reload();
                    }
                }   
        })     
        return false;

    }  



$(document).ready(function(){
    var loginForm_clone= $("#loginForm").clone();
       $(document).on("click","#logout",function(){
            console.log($("id").serialize());
            $("#logout").detach();
            $("#loginState").detach();
            $("#fbar").append(loginForm_clone);
        });
  });
       
  
 