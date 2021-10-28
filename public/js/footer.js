$(function(){
    let window_width = $(window).width();
        if(window_width <= 766){
            $('.copyright_container').children("img").attr("src","../public/img/footer/m_logo.png");
        }else{
            $('.copyright_container').children("img").attr("src","../public/img/footer/logo.png");
        }
    $(window).resize(function(){
        let window_width = $(window).width();
        if(window_width <= 766){
            $('.copyright_container').children("img").attr("src","../public/img/footer/m_logo.png");
        }else{
            $('.copyright_container').children("img").attr("src","../public/img/footer/logo.png");
        }
    });

    var topBtn = $(".top_btn");

    topBtn.on("click",function(e){
        $("html").animate({scrollTop:0},"slow");
        e.preventDefault();        
    });

});