class CommentDelete{

    constructor(boardName,page,res){
        this.page = page;
        this.res = res;
        this.boardName = "driving_"+boardName;
        this.db = require("../mysql/mysql").db();
    }
    deleteAction(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `delete from ${this.boardName}_comment where No = ?`;
            this.db.query(queryString1,this.page,(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${this.boardName} deleteAction No Data : ${Error('failure')}`);
                }else{
                    var result = rows[0];
                    resolve(result); 
                }
            });
        });
    }

    movePageValue(){
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
                    console.log(`${this.boardName} movePageValue No Data : ${Error('failure')}`);
                }else{
                    var result = rows[0].page;
                    resolve(result); 
                }
            });
        });
    }

}

module.exports = CommentDelete;