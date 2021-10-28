$(function(){
    let window_width = $(window).width();
    
        if(window_width <= 766){
            $('.header_container').children("img").attr("src","../public/img/header/m_bg.jpg");
        }else{
            $('.header_container').children("img").attr("src","../public/img/header/bg.jpg");
        }
    $(window).resize(function(){
        let window_width = $(window).width();
        if(window_width <= 766){
            $('.header_container').children("img").attr("src","../public/img/header/m_bg.jpg");
        }else{
            $('.header_container').children("img").attr("src","../public/img/header/bg.jpg");
        }
    });
});