$(function(){
    $(window).load(function(){
        var boardName = "/review";
        var pswForm = $(".password_form > form");
        var pswPage = $(".password_form").attr("value");
        var cencelBtn = $(".cencel_btn");

        cencelBtn.attr('href',boardName);
        pswForm.attr("action",boardName+"/deleteAuth/"+pswPage);
    });
});