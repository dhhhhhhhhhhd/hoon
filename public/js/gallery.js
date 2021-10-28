$(function(){
    const gallery_list = $(".gallery_box > ul > li");
    const full_bg = $(".full_bg");
    const close_btn = $(".gallery_close_btn");
    let window_width = $(window).width();

    if(window_width > 766){
        gallery_list.each(function(){
            $(this).hover(function(){
                $(this).children(".gallery_bg").fadeOut();
            },function(){
                $(this).children(".gallery_bg").fadeIn();
            });
        });

        gallery_list.each(function(){
            $(this).on("click", function(){
                $('body').css({
                    "width":"100%",
                    "height":"100%"
                })
                let window_width = $(window).width();
                if(window_width >= 1024){
    
                    $(this).children("img").css({
                        "position":"fixed",
                        "transform":"translate(105%) scale(1.3)",
                        "top":"28%",
                        "left":"0%",
                        "transitionDuration":"0.5s",
                        "z-index":"10001"
                    });
                }else if(window_width > 766){
                    $(this).children("img").css({
                        "position":"fixed",
                        "transform":"translate(10%)",
                        "top":"28%",
                        "left":"6%",
                        "transitionDuration":"0.5s",
                        "z-index":"10001"
                    });
                }
                full_bg.fadeIn();
            });
        });
    
        close_btn.on("click",function(){
            gallery_list.children("img").removeAttr("style");
            full_bg.removeAttr("style");
        });
    }else{
        $(".gallery_bg").css("display","none");
    }



});