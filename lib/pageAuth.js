class pageAuth{

    constructor(boardName,page,body,res){
        this.page = page;
        this.psw = body.psw;
        this.res = res;
        this.boardName = "driving_"+boardName;
        this.db = require("../mysql/mysql").db();
        this.IsBull = true;
        this.mastarPsw = "speed";
    }

    pswAuth(){
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
                    console.log(`${this.boardName} pswAuth No Data : ${Error('failure')}`);
                }else{
                    var result = rows[0];
                    if(this.psw == result.psw || this.psw == this.mastarPsw){
                        resolve(rows[0]);
                    }else{
                        this.IsBull = false;
                        resolve(this.IsBull);
                    }
                }
            });
        });
    }

    adminPswAuth(){
        if(this.psw == this.mastarPsw){
            this.IsBull = true;
            return this.IsBull;
        }else{
            this.IsBull = false;
            return this.IsBull;
        }
    }
}

module.exports = pageAuth;