  function pageMove(pageSet){
        $.ajax({
                 url:"board.php",
                 DataTyPe:"json",
                 type:"GET",
                 data:({pageInt:pageSet}),
                 success:function(data){
                   $(".tr").remove();
                   $(".ul").remove();
                   $("#tbody").append(data['msg']); 
                   $(".paging").append(data['paging']); 
                 }
             })
               return false;
         }                   
     
     $(document).ready(function(e){
         var lastPage=0;
        $.ajax({
                 url:"board.php",
                 DataTyPe:"json",
                 type:"GET",       
                 data:({pageInt:1}),       
                 success:function(data){
                  $("#tbody").append(data['msg']); 
                  $(".paging").append(data['paging']); 
                    lastPage=data['allPage'];
       }
     })
         $(document).on("click",".page_end",function(){
            pageMove(lastPage);  
         });   
         $(document).on("click",".page_start",function(){
            pageMove(1);
         });        
         $(document).on("click",".iPage",function(){
             $(".iPage").each(function(index,data){
                  $(this).on("click",function(){
                   pageMove(index+1); 
                  });
             });
         });
         
         $("#search").on("click",function(){
           var searchColumn =  $("#searchColumn").val();
           var searchText   =  $("#searchText").val();
          $.ajax({
            url:"board.php",
            DataTyPe:"json",
            type:"GET",       
            data:({pageInt:1,searchText:searchText,searchColumn:searchColumn}),       
            success:function(data){
             if(data['msg']==null){
                  $(".tr").remove();
                  $(".ul").remove();
                  $("#tbody").html(data['emtpyData']); 
                  $(".paging").append(data['paging']); 
             }else{  
                  $(".tr").remove();
                  $(".ul").remove();   
                  $("#tbody").html(data['msg']); 
                  $(".paging").append(data['paging']); 
                  lastPage=data['allPage'];
             }
            },error: function(xhr, status, error){
                var error_confirm=confirm('데이터 전송 오류입니다. 확인을 누르시면 페이지가 새로고침됩니다.');
                if(error_confirm==true){
                    document.location.reload();
                }
            }
     })
         });
          
});
