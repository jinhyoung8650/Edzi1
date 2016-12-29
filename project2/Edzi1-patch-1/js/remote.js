$(document).ready(function(){
  
var remocon =function(){
    $("html").append("<div id='container' style='position: fixed;  width: 60px; height: 110px; border: 3px solid black; border-radius: 20px; top: 120px; left:94.7%'>");
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
    
    
    remoconImg  = frame.addSprite(container,"remoconImg",{width: 44, height:                                                36,x:3.5,y:0});
    top_ButtonImg  = frame.addSprite(container,"top_ButtonImg",{width: 20, height:                                          27,x:5.5,y:76.8});
    btm_ButtonImg  = frame.addSprite(container,"btm_ButtonImg",{width: 20, height:                                          27,x:35.5,y:76.8});
    currentNumber = frame.addSprite(container,"currentNumber",                                                              {width:20,height:40,x:8.1,y:34});
    allNumber  = frame.addSprite(container,"allNumber",{width: 20, height:                                                  40,x:35.5,y:34});
   
    frame.setAnimation(remoconImg ,remocon);
    frame.setAnimation(top_ButtonImg ,top_Button);
    frame.setAnimation(btm_ButtonImg ,btm_Button);
    
    currentNumber.append("<div id='log' style='font-size: 1.8em; left:10%'>1</div>");
    allNumber.append("<div style='font-size: 1.9em; left:10%'>4</div>");
    
    scroll_height=$(document).scrollTop();
    
    /*remocon*/
    var sec_position=$(".sec");
    
    top_ButtonImg.off("click").on("click",function(){
          scroll_height=$(document).scrollTop();
           sec_position.each(function(index,data){
            var pos = $(this).offset().top;
               if(scroll_height > pos+1){
                $("html,body").stop().animate({scrollTop:pos},1000);
                 $("#log").text(index+1);
            }
          })
        });
    btm_ButtonImg.off("click").on("click",function(){
         scroll_height=$(document).scrollTop();
          sec_position.each(function(index,data) {
           var pos = $(this).offset().top;  
               if (scroll_height < (pos-1)) {      
                $('html, body').stop().animate({scrollTop: pos},1000);  
                 $("#log").text(index+1);
                  return false;
          }
       });
    });
    top_ButtonImg.on("hover",function(){
        top_ButtonImg.css({border: '1px solid rgba(122,252,235,0.8)',borderRadius: '50%'});
    }).on("mouseleave",function(){
        top_ButtonImg.css({border: '0px',borderRadius: '50%'});
    });
     btm_ButtonImg.on("hover",function(){
        btm_ButtonImg.css({border: '1px solid rgba(122,252,235,0.8)',borderRadius: '50%'});
    }).on("mouseleave",function(){
        btm_ButtonImg.css({border: '0px',borderRadius: '50%'});
    });
}

/*1024d이상 */
if (matchMedia("screen and (min-width: 1024px)").matches) {
    remocon();
}
else{
    
}
    /*화면 움직일때 1024이상이*/
     $(window).resize(function() {
        if(this.resizeTO) {
            clearTimeout(this.resizeTO);
        }
        this.resizeTO = setTimeout(function() {
            $(this).trigger('resizeEnd');
        }, 0);
    });
    $(window).on('resizeEnd', function() {
        var contain = $("#container");
      var device_width=$(window).width();
        if(device_width>1025){
            if ( $("#container").length > 0 ) {
                $("#container").show();
            } else {
                remocon();
            }
        }else{
            $("#container").hide();
        }
    });
     
});
   
