class ConsoleLog{
    constructor(result,ip){
        this.title = result.title,
        this.name = result.name,
        this.ip = ip;
        this.date = require("../lib/consoleDate");
    }

   writeActionLog(){
    console.log(`제목 : ${this.title} 글이 작성되었습니다. [작성아이피 : ${this.ip}, 작성자 : ${this.name}, 작성 일시 : ${this.date.date()}]`);
   }

   viewActionLog(){
    console.log(`제목 : ${this.title} 글을 열람하였습니다. [열람아이피 : ${this.ip}, 열람 일시 : ${this.date.date()}]`);
   }

   updateActionLog(){
    console.log(`제목 : ${this.title} 글을 수정했습니다. [열람아이피 : ${this.ip}, 수정 일시 : ${this.date.date()}]`);
   }

   deleteActionLog(title){
    console.log(`제목 : ${title.title} 글이 삭제 되었습니다. [삭제아이피 : ${this.ip}, 삭제 일시 : ${this.date.date()}]`);
   }
   
}

module.exports = ConsoleLog;