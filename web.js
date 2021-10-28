//  module
var express = require('express');
var app = express();
var path = require('path');

//  routers
var indexRouter = require('./routers/index');
var aboutRouter = require('./routers/about');
var corporateRouter = require('./routers/corporate');
var normalRouter = require('./routers/normal');
var consignmentRouter = require('./routers/consignment');
var inquiryRouter = require('./routers/inquiry');
var reviewRouter = require('./routers/review');
var infomationRouter = require('./routers/infomation');


//  port
var port = process.env.PORT || 3000;

//  static folder setting
app.use('/public',express.static(path.join(__dirname,'public')));
app.use('/inquiry/public',express.static(path.join(__dirname,'public')));
app.use('/infomation/public',express.static(path.join(__dirname,'public')));
app.use('/review/public',express.static(path.join(__dirname,'public')));

//  ejs setting
app.set('views', path.join(__dirname,"views"));
app.set('view engine', 'ejs');

app.use('/',indexRouter);

app.get('/about',aboutRouter);
app.get('/corporate',corporateRouter);
app.get('/normal',normalRouter);
app.get('/consignment',consignmentRouter);

app.get('/inquiry',inquiryRouter);
app.post('/inquiry/getList',inquiryRouter);
app.get('/inquiry/write',inquiryRouter);
app.post('/inquiry/writeAction',inquiryRouter);
app.post('/inquiry/imgUpload',inquiryRouter);
app.get('/inquiry/:page',inquiryRouter);
app.get('/inquiry/update/:page',inquiryRouter);
app.post('/inquiry/updateAuth/:page',inquiryRouter);
app.post('/inquiry/updateAction/:page',inquiryRouter);
app.get('/inquiry/delete/:page',inquiryRouter);
app.post('/inquiry/deleteAuth/:page',inquiryRouter);
app.get('/inquiry/deleteAction/:page',inquiryRouter);
app.post('/inquiry/commentWriteAction/:page',inquiryRouter);
app.post('/inquiry/commentGetList/:page',inquiryRouter);
app.post('/inquiry/commentUpdateGetData/:page',inquiryRouter);
app.post('/inquiry/commentUpdateAction/:page',inquiryRouter);
app.get('/inquiry/commentDelete/:page',inquiryRouter);
app.post('/inquiry/commentDeleteAuth/:page',inquiryRouter);
app.get('/inquiry/commentDeleteAction/:page',inquiryRouter);

app.get('/review',reviewRouter);
app.post('/review/getList',reviewRouter);
app.get('/review/write',reviewRouter);
app.post('/review/writeAuth',reviewRouter);
app.post('/review/writeAction',reviewRouter);
app.post('/review/imgUpload',reviewRouter);
app.get('/review/:page',reviewRouter);
app.get('/review/update/:page',reviewRouter);
app.post('/review/updateAuth/:page',reviewRouter);
app.post('/review/updateAction/:page',reviewRouter);
app.get('/review/delete/:page',reviewRouter);
app.post('/review/deleteAuth/:page',reviewRouter);
app.get('/review/deleteAction/:page',reviewRouter);
app.post('/review/commentWriteAction/:page',reviewRouter);
app.post('/review/commentGetList/:page',reviewRouter);
app.post('/review/commentUpdateGetData/:page',reviewRouter);
app.post('/review/commentUpdateAction/:page',reviewRouter);
app.get('/review/commentDelete/:page',reviewRouter);
app.post('/review/commentDeleteAuth/:page',reviewRouter);
app.get('/review/commentDeleteAction/:page',reviewRouter);

app.get('/infomation',infomationRouter);
app.post('/infomation/getList',infomationRouter);
app.get('/infomation/write',infomationRouter);
app.post('/infomation/writeAuth',infomationRouter);
app.post('/infomation/writeAction',infomationRouter);
app.post('/infomation/imgUpload',infomationRouter);
app.get('/infomation/:page',infomationRouter);
app.get('/infomation/update/:page',infomationRouter);
app.post('/infomation/updateAuth/:page',infomationRouter);
app.post('/infomation/updateAction/:page',infomationRouter);
app.get('/infomation/delete/:page',infomationRouter);
app.post('/infomation/deleteAuth/:page',infomationRouter);
app.get('/infomation/deleteAction/:page',infomationRouter);
app.post('/infomation/commentWriteAction/:page',infomationRouter);
app.post('/infomation/commentGetList/:page',infomationRouter);
app.post('/infomation/commentUpdateGetData/:page',infomationRouter);
app.post('/infomation/commentUpdateAction/:page',infomationRouter);
app.get('/infomation/commentDelete/:page',infomationRouter);
app.post('/infomation/commentDeleteAuth/:page',infomationRouter);
app.get('/infomation/commentDeleteAction/:page',infomationRouter);

const http = require('http'); // http 모듈 불러오기
const url = 'http://aslee.breaddoor.com'; // 긁어오고 싶은 주소를 입력.

//  server route
app.listen(port,()=>{
    console.log(port+"server");
    http.get(url, stream => {
        let rawdata = '';
        stream.setEncoding('utf8');
        stream.on('data', buffer => rawdata += buffer);
        stream.on('end', function () {
          console.log(rawdata); // 긁어온 내용 뿌리기
        });
      });
});
