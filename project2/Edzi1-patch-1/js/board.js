  function pageMove(pageSet){
           var searchColumn =  $("#searchColumn").val();
           var searchText   =  $("#searchText").val(); 
      $.ajax({
                 url:"board.php",
                 DataTyPe:"json",
                 type:"GET",
                 data:({pageInt:pageSet,searchText:searchText,searchColumn:searchColumn}),
                 success:function(data){
                if(data['msg']==null){
                   $(".tr").remove();
                   $(".ul").remove();
                   $("#tbody").html(data['msg']); 
                   $(".paging").append(data['paging']);  
                }     
                   nextPage=data['nextPage'];
                   $(".tr").remove();
                   $(".ul").remove();
                   $("#tbody").html(data['msg']); 
                   $(".paging").append(data['paging']); 
                 },error: function(xhr, status, error){
                var error_confirm=confirm('데이터 전송 오류입니다. 확인을 누르시면 페이지가 새로고침됩니다.');
                if(error_confirm==true){
                    document.location.reload();
                }
            }
             })
               return  false;
         }                   
     
   function last(direction){
       $.ajax({
           url:"board.php",
           DataTyPe:"json",
           type:"GET",
           data:({pageInt:1}),
           success:function(data){
              var last=direction;
               if(last="lastPage"){
                   pageMove(data['allPage']);
               }
           }
           
       })
   }

     $(document).ready(function(e){
         var move=1;
         var oneSection=3;
         pageMove(1);
         $(document).on("click",".page_end",function(){
             last("lastPage");
         });   
         $(document).on("click",".page_start",function(){
            pageMove(1);
         });  
         $(document).on("click",".page_next",function(){
            move+=oneSection;
           pageMove( move);
         });   
         $(document).on("click",".page_prev",function(){
             move-=oneSection;
            pageMove(move);
         });  
           
         $(document).on("click",".iPage",function(e){/*여기 한번더 눌러야 실행되는데
                                                       그냥 접근은 못하냐?*/
            
             $(".iPage").each(function(index,data){
                  $(this).on("click",function(){
                  pageMove($(data).text());
                  });
             });
         });
         $("#search").on("click",function(){
               pageMove(1);
         });
          
});
