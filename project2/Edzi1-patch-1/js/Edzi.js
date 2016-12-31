$(document).ready(function(){
    var imgcuca=$('#imgcuca');
    var things=$('.things');
    var sm=[];
    var tm=[];
    var dots=[];
    for(i=0;i<5;i++){
        sm[i]=$('#sm'+(i+1));
        tm[i]=$('#tm'+(i+1));
        dots[i]=$('#dots'+(i+1));
        sm[i].hide();
    }
    var lbtn=$("#leftbtn");
    var lbtnr=$("#leftbtnred");
    var rbtn=$("#rightbtn");
    var rbtnr=$("#rightbtnred");
    var imgc=$('#imgcal');
    var count=0;

    imgcuca.hide();
    things.hide();
    imgcuca.show('fade','',2000);
    things.show('drop','',3000);
    rbtnr.hide();
    lbtnr.hide();
    
    tm[0].mouseenter(function(){
        console.log(tm[0].children().val);
        sm[0].show();
    });
    tm[0].mouseleave(function(){
        sm[0].hide();
    });
    tm[1].mouseenter(function(){
        sm[1].show();
    });
    tm[1].mouseleave(function(){
        sm[1].hide();
    });
    tm[2].mouseenter(function(){
        sm[2].show();
    });
    tm[2].mouseleave(function(){
        sm[2].hide();
    });
    tm[3].mouseenter(function(){
        sm[3].show();
    });
    tm[3].mouseleave(function(){
        sm[3].hide();
    });
    tm[4].mouseenter(function(){
        sm[4].show();
    });
    tm[4].mouseleave(function(){
        sm[4].hide();
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
    
    lbtnr.click(function(){
        count--;
        imgc.css('left', '-'+count*100+'%');
        if(count==-1){
            count=4;
            imgc.css('left', '-400%');
        }
    });
    rbtnr.click(function(){
        count++;
        imgc.css('left', '-'+count*100+'%');
        if(count==5){
            count=0;
            imgc.css('left', '0%');
        }
    });
})