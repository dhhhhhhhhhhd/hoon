$(function(){
    $(window).load(function(){
        var boardName = "/infomation";
        var pswForm = $(".password_form > form");
        var pswPage = $(".password_form").attr("value");

        pswForm.attr("action",boardName+"/deleteAuth/"+pswPage);
    });
});