var fs = require('fs');
var path = require('path');

class Delete{

    constructor(boardName,page,res){
        this.page = page;
        this.res = res;
        this.boardName = "driving_"+boardName;
        this.db = require("../mysql/mysql").db();
        this.selectResult = this.selectAction();
    }
    deleteAction(){
        return new Promise((resolve,rejects)=>{
            this.deleteImg();
            var queryString1 = `delete from ${this.boardName} where No = ?`;
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
                    this.deleteImg();
                    this.commentDeleteAction();
                    var result = rows[0];
                    resolve(result); 
                }
            });
        });
    }
    commentDeleteAction(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `delete from ${this.boardName}_comment where page = ?`;
            this.db.query(queryString1,this.page,(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${this.boardName} commentDeleteAction No Data : ${Error('failure')}`);
                }else{
                    var result = rows[0];
                    resolve(result); 
                }
            });
        });
    }

    selectAction(){
        return new Promise((resolve, rejects)=>{
            var queryString1 = `select * from ${this.boardName} where No = ?`;
            this.db.query(queryString1,this.page,(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${this.boardName} selectAction No Data : ${Error('failure')}`);
                }else{
                    var result = rows[0];
                    resolve(result);
                }
            });
        });
    }

    deleteImg(){
        return new Promise((resolve, rejects)=>{
            var queryString1 = `select * from ${this.boardName} where No = ?`;
            this.db.query(queryString1,this.page,(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${this.boardName} selectAction No Data : ${Error('failure')}`);
                }else{
                    if(rows[0].img_link != undefined){
                        var imgSrc = JSON.parse(rows[0].img_link);
                        for(var i = 0; i < imgSrc.length; i++){
                            fs.unlink(path.join(__dirname,`../${imgSrc[i]}`),(err)=>{
                                if(err) console.log(`${rows[0].title} : 삭제할 파일이 없습니다.`);
                            });
                        }
                    }
                    var result = rows[0];
                    resolve(result);
                }
            });
        });
    }

}


module.exports = Delete;