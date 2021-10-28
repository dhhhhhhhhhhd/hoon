class Update{

    constructor(boardName,page,body){
        this.page = page;
        this.boardName = "driving_"+boardName;
        this.title = body.title;
        this.name = body.name;
        this.psw = body.psw;
        var textArr = body.text.split(" ");
        var imgSrc = [];
        var imgSum = [];
        for(var i = 0; i < textArr.length;i++){
            if(textArr[i].match("src") != null){
                var textResult = textArr[i].split("\"");
                imgSrc.push(textResult[1]);
                if(imgSum.length <= 0){
                    imgSum.push(textResult[1]);
                }
            }
        }
        var imgSrcResult = JSON.stringify(imgSrc);
        var imgSumResult = JSON.stringify(imgSum);
        this.sql = {
            title:this.title,
            name:this.name,
            text:body.text,
            psw:this.psw,
            img_link:imgSrcResult,
            img_sum:imgSumResult,
        }
        this.db = require("../mysql/mysql").db();
    }
    updateAction(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `update ${this.boardName} set ? where No = ?`;
            this.db.query(queryString1,[this.sql,this.page],(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${boardName} updateAction No Data : ${Error('failure')}`);
                }else{
                    var result = {title:this.title,name:this.name};
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Update;