$(function(){
    const header_img = $(".header_container > img");
    const window_width = $(window).width();
    var imgName = "board";
    if(window_width <= 1004){
        header_img.attr('src','../public/img/sub_page/m_'+imgName+"_banner.png");
    }
    $(window).resize(function(){
    const window_width = $(window).width();
        if(window_width <= 1004){
            header_img.attr('src','../public/img/sub_page/m_'+imgName+"_banner.png");
        }else{
            header_img.attr('src','../public/img/sub_page/'+imgName+"_banner.png");
        }
    })
});