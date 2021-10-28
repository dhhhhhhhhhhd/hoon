$(function(){
    $(window).load(function(){
        var boardName = "/review";
        var pswForm = $(".password_form > form");
        var pswPage = $(".password_form").attr("value");

        pswForm.attr("action",boardName+"/deleteAuth/"+pswPage);
    });
});