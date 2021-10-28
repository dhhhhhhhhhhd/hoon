$(function(){
    $(window).load(function(){

        // URL 경로
        var boardName = "/inquiry";
        // 엘리먼트 
        var writeBtn = $(".write_btn");
        var cencelBtn = $(".cencel_btn");
        var updateBtn = $(".update_btn");
        var deleteBtn = $(".delete_btn");
        var page = $(".btn_box").attr("value");

        writeBtn.attr("href",boardName+"/write");
        cencelBtn.attr("href",boardName);
        updateBtn.attr("href",boardName+"/update/"+page);
        deleteBtn.attr("href",boardName+"/delete/"+page);
        


    });
});