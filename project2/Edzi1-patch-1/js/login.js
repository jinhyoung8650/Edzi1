function loginform(info){  
    $.ajax({
            url:$(info).attr("action"), 
            dataTyPe:"json", 
            type:$(info).attr('method'),
            data:$(info).serialize(),
            success:function(data){
                if(data['result']=='f'){ 
                    alert(data['msg']);
                }else if(data['result']=='success'){ /* 로그인 성공시*/
                    if(typeof(Storage)!=="underfined"){
                        sessionStorage.setItem('id',data['session_id']);                
                        loginStatus(data['session_id']);
                    }
                }
            },error: function(xhr, status, error){
                var error_confirm=confirm('데이터 전송 오류입니다. 확인을 누르시면 페이지가 새로고침됩니다.');
                if(error_confirm==true){
                    document.location.reload();
                }
            }
    });
    return false;
}

function loginStatus(id){
    $("#loginForm").detach();
    $('#fbar').append("<div id='loginState' style=display: inline-block;'>"+id+'님'+"<button id='logout'>로그아웃</button>"+"</div>");
}

$(document).ready(function(){
    var loginForm_clone= $("#loginForm").clone();
    if(typeof(Storage) !== "undefined"){
        if(sessionStorage.getItem("id")!=null){
            var id=sessionStorage.getItem("id");
            loginStatus(id);
        }
    }
    
    $(document).on("click","#logout",function(){
        console.log($("id").serialize());
        sessionStorage.removeItem("id");
        $("#logout").detach();
        $("#loginState").detach();
        $("#fbar").append(loginForm_clone);
    });
});