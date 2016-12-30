 function ajax_send(sel){
        $.ajax({
            url:"time.php", // login.php
            dataType:"json", // ajax 통신의 데이터 형식
            async:false,  // 동기(false):비동기(true) 
            type:'post',//post
            data:('form').serialize(),//받아올 데이터
            success: function(data){
                
                if(data['result']=='f'){ /* 로그인 실패시 */
                        alert(data['msg']); 
                }else if(data['result']=='success'){ /* 로그인 성공시*/
                        alert(data['msg']); 
                        $('#login').html(data['id']+'님 환영합니다.');
                }
                    
            }   
            });     
        return false;
}