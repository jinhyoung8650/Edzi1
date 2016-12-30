$(document).ready(function(){
    
 function ajax_send(sel){
        $.ajax({
            url:$(sel).attr('action'), // ajax url 
            dataType:"json", // ajax 통신의 데이터 형식
            async:false,  // 동기(false):비동기(true) 
            type:'post',
            data:$(sel).serialize(),
            success: function(data){
                
                if(data['result']=='f'){ /* 로그인 실패시 */
                        alert(data['msg']); 
                }else if(data['result']=='success'){ /* 로그인 성공시*/
                        alert(data['msg']); 
                        $('#login').html(data['id']+'님 환영합니다.');
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

 
    
    
});