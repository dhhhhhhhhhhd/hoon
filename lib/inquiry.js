
class Write{
    constructor(body, date, boardName,req,res,ip){
        this.boardName = "driving_"+boardName;
        this.req = req;
        this.res = res;
        this.db = require("../mysql/mysql").db();
        this.ip = JSON.stringify(ip);
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
        if(imgSum.length == 0){
            var randomResult = Math.floor(Math.random()*11);
            console.log(randomResult);
            imgSum.push("../public/img/review/no_img"+randomResult+".png");
        }

        var imgSrcResult = JSON.stringify(imgSrc);
        var imgSumResult = JSON.stringify(imgSum);
        this.sql = {
            title:body.title,
            name:body.name,
            insert_date:date,
            hit:0,
            psw:body.psw,
            text:body.text,
            ip:this.ip,
            img_link:imgSrcResult,
            img_sum:imgSumResult,
        }
    }

    writeAction(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `alter table ${this.boardName} auto_increment = 1`;
            var queryString2 = `insert into ${this.boardName} set ?`;
            this.db.query(queryString1);
            this.db.query(queryString2,this.sql,(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${boardName} writeAction No Data : ${Error('failure')}`);
                }else{
                    var result = [this.sql,rows.insertId];
                    resolve(result);
                }
            });
        });
    }

}

module.exports = Write;