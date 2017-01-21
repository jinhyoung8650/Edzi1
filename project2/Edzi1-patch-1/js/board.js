  function pageMove(pageSet){
            searchColumn =  $("#searchColumn").val();
            searchText   =  $("#searchText").val();
      
      $.ajax({
                 url:"board.php",
                 DataTyPe:"json",
                 type:"GET",
                 data:({pageInt:pageSet,searchText:searchText,searchColumn:searchColumn}),
                 success:function(data){
                     console.log(searchText);
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
           data:({pageInt:1,searchText:searchText,searchColumn:searchColumn }),
           success:function(data){
              var last=direction;
               if(last="lastPage"){
                   pageMove(data['allPage']);
               }
           }
           
       })
   }

     $(document).ready(function(e){
         var searchColumn ="";
         var searchText  = "";
         var move=1;
         var oneSection=3;
         pageMove(move);
         
         $(document).on("touchstart click",".page_end",function(){
            last("lastPage");
         });   
         $(document).on("touchstart click",".page_start",function(){
            pageMove(move);
         });  
         $(document).on("touchstart click",".page_next",function(){
            move+=oneSection;
            pageMove(move);
         });   
         $(document).on("touchstart click",".page_prev",function(){
             move-=oneSection;
             pageMove(move);
         });  
           
         $(document).on("touchstart click",".iPage",function(){
           pageMove($(this).text());                                    
     
         });
         $("#search").on("touchstart click",function(){
               pageMove(move);
         });
          
});
