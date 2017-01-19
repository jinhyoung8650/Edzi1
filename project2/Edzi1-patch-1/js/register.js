
   function register(){
       
         $.ajax({
              url:"ajax/register.php",
              dataTyPe:"json",
              type:"post",
              data:$("#join_member").serialize(),
              success:function(data){
                  console.log("aaaaa");
                  
                if(data['result']=="success"){
                   $("#submit_btn").css("visibility", "hidden"); $("#join_member").css("visibility", "hidden");
                   $("#joinComplete").css("visibility", "visible");
                    
                    }
              },error:function(xhr,status,error){
                     var error_confirm=confirm('데이터 전송 오류입니다. 확인을 누르시면 페이지가 새로고침됩니다.');
                    if(error_confirm==true){
                        document.location.reload();
                    }
              }    
        
            })
              return false;
   }          
   function confirm(){
            $.ajax({
                url:"ajax/confirm.php",
                dataTyPe:"json",
                type:"post",
                data:$("#id").serialize(),
                success:function(data){
                     
                    if(data['result']=="f"){
                          $("#confirm_did").text(data['msg']);
                         
                    }else if(data['result']=="success"){
                       $("#confirm_did").html("<div>"+data['msg']+"</div>");
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
        
    function chkPwd(str){

             var pw = str;
             var num = pw.search(/[0-9]/g);
             var eng = pw.search(/[a-z]/ig);
             var spe = pw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

             if(pw.length < 8 || pw.length > 15){
             $("#confirm_vali").text("8자리 ~ 15자리 이내로 입력해주세요.");
              return false;
             }
             if(pw.search(/₩s/) != -1){
             $("#confirm_vali").text("비밀번호는 공백업이 입력해주세요.");
              return false;
             } if(num < 0 || eng < 0 || spe < 0 ){
              $("#confirm_vali").text("영문,숫자, 특수문자를 혼합하여 입력해주세요.");
              return false;
             }
             return true;
    }    
        
        
    $(document).ready(function(){
     
          $('#id').off('keyup focus blur').on("keyup focus blur",function(e){
              e.preventDefault();
              confirm();
          });
           $('input[type=password]').off('keyup focus blur').on("keyup focus blur",function(e){
              e.preventDefault();
               
             var confirm_pw=$("#confirm_pw").val();
             var pw=$("#pw").val();
             if(chkPwd( $.trim($('#pw').val()))){
                
                $("#confirm_vali").text("");
                  if((pw==confirm_pw)){
                  $("#confirm_dpw").text('비밀번호가 일치합니다');
                  $("#submit_btn").css("visibility", "visible");      
                  }else{
                     $("#confirm_dpw").text('비밀번호가 일치하지 않습니다');
                  }
                 return false;

              }   
        
           });
          
                  
        /*$("#submit_btn").css("visibility", "hidden");*/
        
        $("#submit_btn").on("click",function(){
          register();
           
        }); 
    });
    
    
