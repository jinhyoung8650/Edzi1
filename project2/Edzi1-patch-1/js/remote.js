$(document).ready(function(e){

  
frame = {
    defaultRate:15,
    width: 960,
    height: 480,
    time: 0,
    baseDiv: $()
};
frame.animation = function(options) {
    var defaultValues = {
        url : false,
        width : 64,
        AllFrames : 1,
        currentFrame : 0,
        rate : 1,
        offsetx: 0,
        offsety: 0,
    }
    $.extend(this, defaultValues, options);
    if(options.rate){
        this.rate = Math.round(this.rate / frame.defaultRate);
    }
    if(this.url){
        frame.addImage(this.url);
    }
}
frame.setFrame = function(div, animation) {
    div.css("backgroundPosition", "" + (-animation.currentFrame * animation.width - animation.offsetx) + "px "+(-animation.offsety)+"px");
}
frame.animations = [];
frame.setAnimation = function(div, animation, loop, callback){
    var animate = {
        animation: $.extend({}, animation),
        div: div,
        loop: loop,
        callback: callback,
        counter: 0
    }
    
    if(animation.url){
        div.css("backgroundImage","url('"+animation.url+"')");
    }
    
    var divFound = false;
    for (var i = 0; i < frame.animations.length; i++) {
        if(frame.animations[i].div.is(div)){
            divFound = true;
            frame.animations[i] = animate;
        }
    }
    
    if(!divFound) {
        frame.animations.push(animate);
    }
    
    frame.setFrame(div, animation);
}

frame.spriteFragment = $("<div class='frame_sprite' style='position: absolute; overflow: hidden;'></div>");
frame.addSprite = function(parent, divId, options){
    var options = $.extend({
        x: 0,
        y: 0,
        width: 64,
        height: 64,
        flipH: false,
		flipV: false,
		rotate: 0,
		scale: 1,
        zIndex:0
        
    }, options);
    var sprite = frame.spriteFragment.clone().css({
            left:   options.x,
            top:    options.y,
            width:  options.width,
            flipH:  options.flipH,
		    flipV:  options.flipV,
            height: options.height,
            zIndex: options.zIndex}).attr("id",divId).data("frame",options);
    parent.append(sprite);
    return sprite;
}

frame.imagesToPreload = [];

frame.addImage = function(url) {
    if ($.inArray(url, frame.imagesToPreload) < 0) {
        frame.imagesToPreload.push();
    }
    frame.imagesToPreload.push(url);
};


 
    
var remocon =function(){
    $("html").append("<div id='container' style='position: fixed;  width: 60px; height: 110px; border: 4px solid black; border-radius: 20px; top: 120px; right:0.2%; z-index:101;'>");/*리모콘 div*/
  
    var  container= $("#container").draggable({ containment: "parent"  });

     
       console.log($("#container").offset().top);
    /*이미지 등록*/
    var remocon = new frame.animation({
         url : "img/remocon.png",
    });
     var top_Button = new frame.animation({
         offsetx: 22.535,
         offsety:-0.2,
         url : "img/top_button.png",
    });
    var btm_Button = new frame.animation({
         url : "img/btm_button.png",
    });
    
    /*이미지 크기조정*/
    remoconImg  = frame.addSprite(container,"remoconImg",{width: 44, height:                                                36,x:1.5,y:0});
    top_ButtonImg  = frame.addSprite(container,"top_ButtonImg",{width: 17.8, height:                                          27,x:7.3,y:76.8});
    btm_ButtonImg  = frame.addSprite(container,"btm_ButtonImg",{width: 17.0, height:                                          27,x:34.5,y:76.8});
    currentNumber = frame.addSprite(container,"currentNumber",                                                              {width:20,height:40,x:8.1,y:34});
    allNumber  = frame.addSprite(container,"allNumber",{width: 20, height:                                                  40,x:35.5,y:34.1});
   
    frame.setAnimation(remoconImg ,remocon);
    frame.setAnimation(top_ButtonImg ,top_Button);
    frame.setAnimation(btm_ButtonImg ,btm_Button);
    currentNumber.append("<div id='log' style='font-size: 1.8em; left:10%'></div>");
    allNumber.append("<div  style='font-size: 1.9em; left:10%'>"+$(".sec").length+"+</div>");
    
    scroll_height=$(document).scrollTop();
    var sec_position=$(".sec");
   
    /*리모콘 눌렀을때*/
  
    top_ButtonImg.off("click").on("click",function(){
          scroll_height=$(document).scrollTop();
         sec_position.each(function(index,data){
                var pos = $(this).offset().top;
                 if(scroll_height > pos+1){
                  $("html,body").stop().animate({scrollTop:pos},1000);
            }
          })
        });
    btm_ButtonImg.off("click").on("click",function(){
         scroll_height=$(document).scrollTop();
          sec_position.each(function(index,data) {
           var pos = $(this).offset().top;  
                if (scroll_height < (pos-1)) {      
                 $('html, body').stop().animate({scrollTop: pos},1000);  
                  return false;
          }
       });
    });
    top_ButtonImg.on("hover",function(){
        top_ButtonImg.css({border: '1px solid black ',borderRadius: '90%'});
    }).on("mouseleave",function(){
        top_ButtonImg.css({border: '0px',borderRadius: '50%'});
    });
     btm_ButtonImg.on("hover",function(){
        btm_ButtonImg.css({border: '1px solid black',borderRadius: '90%'});
    }).on("mouseleave",function(){
        btm_ButtonImg.css({border: '0px',borderRadius: '50%'});
    });
}
 /*스크롤조정*/
function currentScroll(){
       var sec_position=$(".sec");
        
    scroll_height=$(document).scrollTop();
       var firstSec=$(".sec:eq(0)").offset().top; 
         sec_position.each(function(index,data){
          var pos = $(this).offset().top*0.9;
           if(scroll_height+firstSec > pos){
              $("#log").text(index+1);
            }
          })
   }
   
/*1024d이상 */
if (matchMedia("screen and (min-width: 1024px)").matches) {
     
    
    remocon();
    currentScroll();
    
    $(window).scroll(function(e){
    currentScroll(); 
    var con = $('#container');
	if($("#container").offset().top  < 120 ){
        con.css({top:"120px"}); 
    }else if((con.height()+con.offset().top)>$("html body").height()){
        con.css({top:"120px"}); 
    }
    });
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
                currentScroll();
            }
        }else{
            $("#container").hide();
        }
    });
     

   
});