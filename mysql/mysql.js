exports.db = ()=>{
    var mysql = require('mysql');

    // var db = mysql.createConnection({
    //     host:'localhost',
    //     user:'root',
    //     password:'speed',
    //     database:'dad_driving'
    // });

    
    var db = mysql.createConnection({
        host:'driving.cafe24app.com',
        user:'speed7223',
        password:'aq1sw2de3*',
        database:'speed7223'
    });

    return db;
}