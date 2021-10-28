
class GetList{
    constructor(boardName,res,page){
        this.boardName = "driving_"+boardName;
        this.res = res;
        this.db = require("../mysql/mysql").db();
    }

    getListAction(){
        return new Promise((resolve,rejects)=>{
            var queryString1 = `select * from ${this.boardName} order by no desc`;
            this.db.query(queryString1,(err,rows)=>{
                if(err){
                    this.res.send(`
                        <h1>페이지에 오류가 있습니다.</h1>
                        <a href="/">메인으로 이동하기</a>
                    `);
                    rejects(err);
                }else if(rows.length == 0){
                    console.log(`${this.boardName} getListAction No Data : ${Error('failure')}`);
                }else{
                    var result = rows;
                    resolve(result);
                }
            });
        });
    }

}

module.exports = GetList;