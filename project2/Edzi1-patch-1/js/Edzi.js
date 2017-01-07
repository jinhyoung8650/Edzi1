function carousel() {
    count++;
    imgc.css('left', '-'+count*100+'%');
    if(count==5){
        count=0;
        imgc.css('left', '0%');
    }
    for(i=0;i<5;i++){
        dots[i].css('background-color', 'silver');
    }
    dots[count].css('background-color', 'black');
}

$(document).ready(function(){
    var imgcuca=$('#imgcuca');
    var things=$('.things');
    var sm=[];
    var tm=[];
    var dots=[];
    for(i=0;i<5;i++){
        sm[i]=$('#sm'+(i+1));
        dots[i]=$('#dot'+(i+1));
        sm[i].hide();
    }
    var lbtn=$("#leftbtn");
    var lbtnr=$("#leftbtnred");
    var rbtn=$("#rightbtn");
    var rbtnr=$("#rightbtnred");
    var imgc=$('#imgcal');
    var count=0;
    var direction=false;

    $('#libox').hide();
    imgcuca.hide();
    things.hide();
    imgcuca.show('fade','',2000);
    
    if(matchMedia("screen and (min-width: 1024.1px)").matches){
        things.show('drop','',3000);
    }
    else{
        things.show();
        things.children('p, ul').hide();
    }
    
    things.click(function(){
        if(matchMedia("screen and (min-width: 1024.1px)").matches){   
        }
        else{
            $(this).children('p, ul').toggle();
        }
    });
    
    $('#libtn').click(function(){
        $('#libox').toggle();
        if(direction==false){
            $(this).css('transform','rotate(180deg)');
            direction=true;
        }
        else{
            $(this).css('transform','rotate(0deg)');
            direction=false;
        }
    });
    
    rbtnr.hide();
    lbtnr.hide();
    dots[0].css('background-color', 'black');
    $('.eng').hide();
    
    $('.tms').mouseenter(function(){
        if(direction==false){
            if($(this).attr('id')=='tm3'){
                if(matchMedia("screen and (min-width: 1024.1px)").matches){
                    $(this).css('font-size', '80%').css('padding-bottom','0.5em');
                    $('#sm3').css('margin-top', '1.2em');
                }
                else if(matchMedia("screen and (min-width: 767.1px) and (max-width: 1024px)").matches){
                    $(this).css('font-size', '80%').css('padding-bottom','0.5em');
                    $('#sm3').css('margin-top', '0em').css('font-size','120%');
                }
                $(this).children('ul').show();
                $(this).children('.eng').show();
                $(this).children('.kor').hide();
            }
            else{
                $(this).children('ul').show();
                $(this).children('.eng').show();
                $(this).children('.kor').hide();
            }
        }
        else{
        }
    });
    
    $('.tms').mouseleave(function(){
        if($(this).attr('id')=='tm3'){
                $(this).css('font-size', '100%');
                $(this).children('ul').hide();
                $(this).children('.eng').hide();
                $(this).children('.kor').show();
            }
            else{
                $(this).children('ul').hide();
                $(this).children('.eng').hide();
                $(this).children('.kor').show();
            }
    });
    
    lbtn.mouseover(function(){
        lbtn.hide();
        lbtnr.show();
    });
    lbtnr.mouseleave(function(){
        lbtnr.hide();
        lbtn.show();
    });
    rbtn.mouseenter(function(){
        rbtnr.show();
    });
    rbtnr.mouseleave(function(){
        rbtnr.hide();
    });
    
    $('.dots').mouseenter(function(){
        $(this).css('background-color', 'black');
    });
    $('.dots').mouseleave(function(){
        $(this).css('background-color', 'silver');
        dots[count].css('background-color', 'black');
    });
    
    $('.dots').click(function(){
        var text=$(this).text();
        count=text;
        imgc.css('left', '-'+count*100+'%');
        for(i=0;i<5;i++){
            dots[i].css('background-color', 'silver');
        }
        dots[count].css('background-color', 'black');
    });
    
    lbtnr.click(function(){
        count--;
        imgc.css('left', '-'+count*100+'%');
        if(count==-1){
            count=4;
            imgc.css('left', '-400%');
        }
        for(i=0;i<5;i++){
            dots[i].css('background-color', 'silver');
        }
        dots[count].css('background-color', 'black');
    });
    rbtnr.click(function(){
        count++;
        imgc.css('left', '-'+count*100+'%');
        if(count==5){
            count=0;
            imgc.css('left', '0%');
        }
        for(i=0;i<5;i++){
            dots[i].css('background-color', 'silver');
        }
        dots[count].css('background-color', 'black');
    });
    
    var t=setInterval(function(){
        count++;
        imgc.css('left', '-'+count*100+'%');
        if(count==5){
            count=0;
            imgc.css('left', '0%');
        }
        for(i=0;i<5;i++){
            dots[i].css('background-color', 'silver');
        }
        dots[count].css('background-color', 'black');
    },3000);
})