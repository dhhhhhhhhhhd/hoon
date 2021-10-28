class View{
    constructor(boardName,req,res){
        this.boardName = "driving_"+boardName;
        this.res = res;
        this.req = req;
        this.page = req.params.page;
        this.db = require("../mysql/mysql").db();
        this.ip = require('request-ip');
    }

    viewAction(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `select * from ${this.boardName} where No = ?`;
            this.db.query(queryString1,this.page,(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${this.boardName} viewAction No Data : ${Error('failure')}`);
                }else{
                    this.viewHitUpdate(Number(rows[0].hit));
                    var result = rows[0];
                    resolve(result);
                }
            });
        });
    }

    viewHitUpdate(selectHit){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `update ${this.boardName} set ? where No = ?`;
            this.db.query(queryString1,[{hit:selectHit + 1},this.page],(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                    return;
                }else if(rows.length == 0){
                    console.log(`${this.boardName} viewHitUpdate No Data : ${Error('failure')}`);
                }else{
                    var result = rows[0];
                    resolve(result);
                }
            });
        });
    }
}

module.exports = View;