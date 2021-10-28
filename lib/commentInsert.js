
class CommentInsert{
    constructor(body, date, boardName,req,res,ip,page){
        this.boardName = "driving_"+boardName;
        this.req = req;
        this.res = res;
        this.db = require("../mysql/mysql").db();
        this.ip = JSON.stringify(ip);
        this.page = page;
        this.sql = {
            name:body.name,
            psw:body.psw,
            text:body.text,
            insert_date:date,
            page:this.page,
            ip:this.ip,
        }
    }

    writeAction(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `alter table ${this.boardName}_comment auto_increment = 1`;
            var queryString2 = `insert into ${this.boardName}_comment set ?`;
            this.db.query(queryString1);
            this.db.query(queryString2,this.sql,(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${this.boardName} writeAction No Data : ${Error('failure')}`);
                }else{
                    var result = [this.sql];
                    resolve(result);
                }
            });
        });
    }
}

module.exports = CommentInsert;