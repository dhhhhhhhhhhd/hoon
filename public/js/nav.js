

$(function(){
    const m_menu_btn = $(".m_menu_btn");
    const menu_container = $(".m_menu_container");
    const m_menu_close = $(".m_menu_close");
    const nav_container = $(".nav_container");

    var mainMenu = $(".menu_container > li");
    var subMenu = $('.sub_menu');
    var subMenuList = $(".this_sub_menu");

    nav_container.on("mouseleave",function(){
        subMenu.slideUp();
    });


    m_menu_btn.on("click", function(){
        menu_container.css({
            "left":"0%",
            "transitionDuration":"0.5s"
        });
    });
    m_menu_close.on("click", function(){
        menu_container.css({
            "left":"-100%",
            "transitionDuration":"0.5s"
        });
    });
    let window_width = $(window).width();
    if(window_width > 766){

        $(window).scroll(function(){
            var scrollY = scrollY;
            if(scrollY >= 100){
                nav_container.css({
                    "background":"url('../public/img/nav/nav_bg_fixed.png') no-repeat"
                });
            }else{
                nav_container.removeAttr('style');
            }
        })

        mainMenu.each(function(index){
            $(this).hover(function(){
                subMenu.slideDown();
                subMenuList.eq(index).css({"backgroundColor":"#f3c516","transitionDuration":"0.5s"});
                $(this).css({"backgroundColor":"#f0b911","transitionDuration":"0.5s"});
            },function(){
                subMenuList.eq(index).removeAttr("style");
                $(this).removeAttr('style');
            });
            subMenuList.eq(index).hover(function(){
                subMenuList.eq(index).css({"backgroundColor":"#f3c516","transitionDuration":"0.5s"});
                mainMenu.eq(index).css({"backgroundColor":"#f0b911","transitionDuration":"0.5s"});
            },function(){
                subMenuList.eq(index).removeAttr('style');
                mainMenu.removeAttr('style');
            });
        });
    }


});