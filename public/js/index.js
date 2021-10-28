$(function(){
    const arrow = $('.arrow');
    window.setInterval(function(){
            if(arrow.css("top") != "0px"){
                arrow.css({"top":"0px","transitionDuration":"1s"});
            }else{
                arrow.css({"top":"15px","transitionDuration":"1s"});
            }
    },1200);
})