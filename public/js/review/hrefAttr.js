$(function(){
    $(window).load(function(){

        // URL 경로
        var boardName = "/review";
        // 엘리먼트 
        var writeBtn = $(".write_btn");
        var cencelBtn = $(".cencel_btn");
        var updateBtn = $(".update_btn");
        var deleteBtn = $(".delete_btn");
        var page = $(".btn_box").attr("value");

        var tabMenuBox = $(".tab_menu_box > li");

        var textBox = $(".text_box > p");
        var window_width = $(window).width();
        if(window_width <= 1024){
            textBox.each(function(){
                $(this).children("img").removeAttr("style");
                $(this).children("img").css("width","100%");
            });
    
        }else{
            textBox.each(function(){
                $(this).children("img").removeAttr("style");
            });
        }

        $(window).resize(function(){
        var window_width = $(window).width();
            if(window_width <= 1024){
                textBox.each(function(){
                    $(this).children("img").removeAttr("style");
                    $(this).children("img").css("width","100%");
                });
            }else{
                textBox.each(function(){
                    $(this).children("img").removeAttr("style");
                });
            }
        })

        tabMenuBox.eq(1).css({"background-color":"#eab900"});
        tabMenuBox.eq(1).children("a").css({"color":"white"});

        writeBtn.attr("href",boardName+"/write");
        cencelBtn.attr("href",boardName);
        updateBtn.attr("href",boardName+"/update/"+page);
        deleteBtn.attr("href",boardName+"/delete/"+page);
        


    });
});