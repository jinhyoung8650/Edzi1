$(document).ready(function(){
   
    $("html").append("<div id='container' style='position: fixed;  width: 60px; height: 110px; border: 3px solid black; top: 120px; left:94.7%'>");
    var  container= $("#container").draggable();
    
    var remocon = new frame.animation({
         url : "img/remocon.png",
    });
     var top_Button = new frame.animation({
         url : "img/top_button.png",
    });
    var btm_Button = new frame.animation({
         url : "img/btm_button.png",
    });
    
    
    remoconImg  = frame.addSprite(container,"remoconImg",{width: 44, height:                                                36,x:05,y:0});
    top_ButtonImg  = frame.addSprite(container,"top_ButtonImg",{width: 17, height:                                          27,x:8.5,y:76.8});
    btm_ButtonImg  = frame.addSprite(container,"btm_ButtonImg",{width: 17, height:                                          27,x:38.5,y:76.8});
    currentNumber = frame.addSprite(container,"currentNumber",                                                              {width:20,height:40,x:10,y:34});
    allNumber  = frame.addSprite(container,"allNumber",{width: 20, height:                                                  40,x:34.5,y:34});
   
    frame.setAnimation(remoconImg ,remocon);
    frame.setAnimation(top_ButtonImg ,top_Button);
    frame.setAnimation(btm_ButtonImg ,btm_Button);
    
    currentNumber.append("<div id='log' style='font-size: 1.8em; left:10%'>1</div>");
    allNumber.append("<div style='font-size: 1.9em; left:10%'>4</div>");
    
    scroll_height=$(document).scrollTop();
    
    top_ButtonImg.off("click").on("click",function(){
            var top_position= new Array();
            var sec_position=$(".sec");
            sec_position.each(function(index,data){
            scroll_height=$(document).scrollTop();
            top_position[index]=$("#sec"+(index+1)).offset().top;
            if(scroll_height>=top_position[index]){
                  console.log(scroll_height+"  /   "+top_position[index]);
              $("html,body").stop().animate({scrollTop:top_position[index]-150}
                ,1000,"easeOutCubic");
                $("#log").text(index+1);
            }
          });
        });
    btm_ButtonImg.off("click").on("click",function(){
            var top_position= new Array();
            var sec_position=$(".sec");
            sec_position.each(function(index,data){
            scroll_height=$(document).scrollTop();
            top_position[index]=$("#sec"+(index+1)).offset().top;
           /* if(scroll_height<=top_position[index]){
              $("html,body").stop().animate(
                {scrollTop:top_position[index]}
                ,1000,"easeOutCubic");
            }*/
        });
             if(scroll_height<=top_position[0]){
                   $("html,body").stop().animate(
                {scrollTop:top_position[1]-150}
                ,1000,"easeOutCubic");
                 $("#log").text(2);
              }else if(scroll_height<=top_position[1]){
                      $("html,body").stop().animate(
                {scrollTop:top_position[2]-150}
                ,1000,"easeOutCubic");
                   $("#log").text(3);
              } else if(scroll_height<=top_position[2]){
                      $("html,body").stop().animate(
                {scrollTop:top_position[2]-150}
                ,1000,"easeOutCubic");
                   $("#log").text(3);
              }   
    });
     
});