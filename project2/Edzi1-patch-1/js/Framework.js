frame = {
    defaultRate:15,
    width: 960,
    height: 480,
    time: 0,
    baseDiv: $()
};

frame.initialize = function(options) {
    $.extend(frame, options);
}

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

frame.callbacks = [];

frame.addCallback = function(callback, rate){
    frame.callbacks.push({
        callback: callback,
        rate: Math.round(rate / frame.defaultRate),
        counter: 0
    });
}

frame.refreshGame = function (){
    
    var finishedAnimations = [];
    
    for (var i=0; i < frame.animations.length; i++) {
        
        var animate = frame.animations[i];
        
        animate.counter++;
        if (animate.counter == animate.animation.rate) {
            animate.counter = 0;
            animate.animation.currentFrame++;
            if(!animate.loop && animate.animation.currentFrame >= animate.animation.numberOfFrames){
                finishedAnimations.push(i);
                if(animate.callback){
                    animate.callback();
                }
            } else {
                animate.animation.currentFrame %= animate.animation.numberOfFrames;
                frame.setFrame(animate.div, animate.animation);
            }
        }
    }
    for(var i = finishedAnimations.length-1; i >= 0; i--){
        frame.animations.splice(finishedAnimations[i], 1);
    }
    
    for (var i=0; i < frame.callbacks.length; i++) {
        var call  = frame.callbacks[i];
        
        call.counter++;
        if (call.counter == call.rate) {
            var currentTime = (new Date()).getTime();
            call.counter = 0;
            call.callback(currentTime - frame.time);
        }
    }
 
}


