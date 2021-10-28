class CommentUpdate{

    constructor(boardName,page,body,res){
        this.page = page;
        this.res = res;
        this.boardName = "driving_"+boardName;
        this.name = body.name;
        this.text = body.text;
        this.psw = body.psw;
        this.masterPsw = "speed";
        this.sql = {
            name:this.name,
            text:this.text,
        }
        this.db = require("../mysql/mysql").db();
    }
    updateAction(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `update ${this.boardName}_comment set ? where No = ?`;
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

    updateActionAuth(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `select * from ${this.boardName}_comment where No = ?`;
            this.db.query(queryString1,this.page,(err,rows)=>{
                if(err){
                    this.res.send(`
                    <h1>페이지에 오류가 있습니다.</h1>
                    <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${boardName} updateActionAuth No Data : ${Error('failure')}`);
                }else{
                    if(this.psw == rows[0].psw || this.psw == this.masterPsw){
                        resolve([true,rows[0].page]);
                    }else{
                        resolve([false,rows[0].page]);
                    }
                }
            });
        });
    }

}

module.exports = CommentUpdate;