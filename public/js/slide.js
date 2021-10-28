$(function(){
    const slide_img = $(".slide_center > ul > li");
    const slide_text = $('.slide_text > ul > li');
    const next_btn = $(".next_btn");
    slide_img.eq(0).css({"right":"0%","transitionDuration":"0.5s"});
    slide_text.eq(0).children("ul").css({"right":"-10%","transitionDuration":"0.5s"});

    next_btn.each(function(){
        $(this).on("click",function(){
            let val = Number($(this).attr("value"));
            if(val != 3){
                slide_img.removeAttr("style");
                slide_text.children("ul").removeAttr("style");
                slide_img.eq(val).css({"right":"0%","transitionDuration":"0.5s"});
                slide_text.eq(val).children("ul").css({"right":"-10%","transitionDuration":"0.5s"});
            }else{
                slide_img.removeAttr("style");
                slide_text.children("ul").removeAttr("style");
                slide_img.eq(0).css({"right":"0%","transitionDuration":"0.5s"});
                slide_text.eq(0).children("ul").css({"right":"-10%","transitionDuration":"0.5s"});
            }
        });
    });
});