var express = require('express');
var router = express.Router();

// layout router
var nav = require('../layout/nav');
var footer = require('../layout/footer');

var nowDate = require("../lib/date");
var requestIp = require("request-ip");
var bodyParser = require('body-parser');

var GetList = require('../lib/getList');
var Write = require('../lib/inquiry');
var ConsoleLog = require('../lib/consoleLog');
var View = require('../lib/view');
var PageAuth = require('../lib/pageAuth');
var Update = require('../lib/update');
var Delete = require('../lib/delete');
var CommentInsert = require('../lib/commentInsert');
var CommentGetList = require('../lib/commentGetList');
var CommentUpdateGetList = require('../lib/commentUpdateGetList');
var CommentUpdate = require('../lib/commentUpdate');
var CommentDelete = require('../lib/commentDelete');

var upload = require('../lib/multer').multer();

var boardName = "inquiry";
var boardTitle = "문의게시판";

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:false}));

router.get(`/${boardName}`, (req,res)=>{
    var render = {
        nav:nav.nav(),
        boardTitle:boardTitle,
        footer:footer.footer(),
    }
    res.render(`${boardName}`, render);
});

router.post(`/${boardName}/getList`,async (req,res)=>{
    var getList = new GetList(boardName,res);
    var getListResult = await getList.getListAction().then(function(result){
        return result;
    },function(err){
        console.log(`then error : ${err}`);
    });
    res.json(getListResult);
});

router.get(`/${boardName}/write`,(req,res)=>{
    var render = {
        nav:nav.nav(),
        boardName:boardName,
        boardTitle:boardTitle,
        action:`/${boardName}/writeAction`,
        footer:footer.footer(),
    }
    res.render(`write`, render);
});

router.post(`/${boardName}/writeAction`,async (req,res)=>{
    var body = req.body;
    var date = nowDate.date();
    var ip = requestIp.getClientIp(req);
    var writeAction = new Write(body,date,boardName,req,res,ip);
    var writeResult = await writeAction.writeAction().then
    (function(result){
        var consoleLog = new ConsoleLog(result[0],ip);
        consoleLog.writeActionLog();
        res.redirect(`/${boardName}/${result[1]}`);
    },function(err){
        console.log(`then error : ${err}`);
    });
});

router.post(`/${boardName}/imgUpload`, upload.single('upload'),(req,res)=>{
    var filePath = `/public/upload/img/${req.file.filename}`;
    res.send(`{"filename" : "imgDefaultName", "uploaded" : 1,"url":"${filePath}"}`);
});

router.get(`/${boardName}/:page`,async (req,res)=>{
    var view = new View(boardName,req,res);
    var ip = requestIp.getClientIp(req);
    var page = req.params.page;
    var viewResult = await view.viewAction().then(function(result){
        return result;
    },function(err){
        console.log(`then error : ${err}`);
    });
    var consoleLog = new ConsoleLog(viewResult,ip);
        consoleLog.viewActionLog();
        var render = {
            nav:nav.nav(),
            title:viewResult.title,
            name:viewResult.name,
            page:page,
            boardTitle:boardTitle,
            insertDate:viewResult.insert_date,
            hit:viewResult.hit,
            text:viewResult.text,
            boardName:boardName,
            commentAction:`/${boardName}/commentWriteAction/${page}`,
            commentUpdateAction:`/${boardName}/commentUpdateAction/${page}`,
            footer:footer.footer(),
        }
        res.render(`view`, render);
}); 

router.get(`/${boardName}/update/:page`,(req,res)=>{
    var page = req.params.page;
    var render = {
        nav:nav.nav(),
        page:page,
        boardName:boardName,
        boardTitle:boardTitle,
        props:"update",
        footer:footer.footer(),
    }
    res.render('password', render);
});

router.post(`/${boardName}/updateAuth/:page`,async (req,res)=>{
    var page = req.params.page;
    var body = req.body;
    var pageAuth = new PageAuth(boardName,page,body,res);
    var authResult = await pageAuth.pswAuth().then((result)=>{
        return result;
    },(err)=>{
        console.log(`then error ${err}`);
    });
    if(!authResult){
        res.send(`
        <script>
            alert("비밀번호가 틀렸습니다.");
            history.back();
        </script>
        `)
    }else{
        var render = {
            nav:nav.nav(),
            name:authResult.name,
            title:authResult.title,
            text:authResult.text,
            boardName:boardName,
            boardTitle:boardTitle,
            psw:authResult.psw,
            action:`/${boardName}/updateAction/${page}`,
            footer:footer.footer(),
        }
        res.render('update',render);
    }
});

router.post(`/${boardName}/updateAction/:page`,async (req,res)=>{
    var page = req.params.page;
    var body = req.body;
    var ip = requestIp.getClientIp(req);
    var update = new Update(boardName,page,body);

    var updateResult = await update.updateAction().then((result)=>{
        return result;
    },(err)=>{
        console.log(`than error : ${err}`);
    });
    if(updateResult != undefined){
    var consoleLog = new ConsoleLog(updateResult,ip);
        consoleLog.updateActionLog();
        res.send(`
        <script>
        alert("수정되었습니다.");
        location.href="/${boardName}/${page}";
        </script>
        `);
    }
});

router.get(`/${boardName}/delete/:page`,(req,res)=>{
    var page = req.params.page;
    var render = {
        nav:nav.nav(),
        page:page,
        boardName:boardName,
        props:"delete",
        footer:footer.footer(),
    }
    res.render('password', render);
});

router.post(`/${boardName}/deleteAuth/:page`,async (req,res)=>{
    var page = req.params.page;
    var body = req.body;
    var pageAuth = new PageAuth(boardName,page,body,res);
    var authResult = await pageAuth.pswAuth().then((result)=>{
        return result;
    },(err)=>{
        console.log(`then error ${err}`);
    });

    if(authResult){
        res.send(`
            <script>
                alert("삭제 되었습니다.");
                location.href="/${boardName}/deleteAction/${page}";
            </script>
        `);
    }else{
        res.send(`
            <script>
                alert("비밀번호가 틀립니다.");
                history.back();
            </script>
        `)
    }
});

router.get(`/${boardName}/deleteAction/:page`, async(req,res)=>{
    var page = req.params.page;
    var del = new Delete(boardName,page,res);
    var ip = requestIp.getClientIp(req);
    var selectData = await del.selectAction().then((result)=>{
        return result;
    },(err)=>{
        console.log(`than Error deleteAction ${err}`);
    });
    var deleteImgResult = await del.deleteImg(selectData);
    var deleteResult = await del.deleteAction().then((result)=>{
        var consoleLog = new ConsoleLog(selectData,ip);
        consoleLog.deleteActionLog(selectData);
        del.commentDeleteAction();
        res.redirect(`/${boardName}`);
        return result;
    },(err)=>{
        console.log(`then error ${err}`);
    });
});


router.post(`/${boardName}/commentWriteAction/:page`, async (req,res)=>{
    var body = req.body;
    var page = req.params.page;
    var date = nowDate.date();
    var ip = requestIp.getClientIp(req);
    var commentInsert = new CommentInsert(body,date,boardName,req,res,ip,page);
    var commentInsertResult = await commentInsert.writeAction().then((result)=>{
        return result;
    },(err)=>{
        console.log(`then error ${err}`);
    });
    if(commentInsertResult != undefined){
        res.send(`
            <script>
                alert("댓글이 등록되었습니다.");
                location.href="/${boardName}/${page}#comment_box_view";
            </script>
        `)
    }
});


router.post(`/${boardName}/commentGetList/:page`,async (req,res)=>{
    var page = req.params.page;
    var commentGetList = new CommentGetList(boardName,res,page);
    var getListResult = await commentGetList.getListAction().then((result)=>{
        res.json(result);
        return;
    },(err)=>{
        console.log(`then error commentGetList ${err}`);
    });
});

router.post(`/${boardName}/commentUpdateGetData/:page`,async (req,res)=>{
    var page = req.params.page;
    var commentUpdateGetList = new CommentUpdateGetList(boardName,res,page);
    var getListResult = await commentUpdateGetList.getListAction().then((result)=>{
        res.json(result);
        return;
    },(err)=>{
        console.log(`then error commentGetList ${err}`);
    });
});

router.post(`/${boardName}/commentUpdateAction/:page`, async(req,res)=>{
    var page = req.params.page;
    var body = req.body;
    var commentUpdate = new CommentUpdate(boardName,page,body,res);
    var commentAuth = await commentUpdate.updateActionAuth().then((result)=>{
        return result;
    },(err)=>{
        console.log(`then error commentUpdateAuth ${err}`);
    });
    if(commentAuth[0]){
        var commentUpdateResult = await commentUpdate.updateAction().then((result)=>{
            return result;
        },(err)=>{
            console.log(`then error commentUpdateREsult ${err}`);
        });
        res.send(`
            <script>
                alert("수정되었습니다.");
                location.href="/${boardName}/${commentAuth[1]}#comment_box_view";
            </script>
        `)
    }else{
        res.send(`
        <script>
            alert('비밀번호가 틀렸습니다.');
            history.back();
        </script>
        `);
        return;
    }

});

router.get(`/${boardName}/commentDelete/:page`,(req,res)=>{
    var page = req.params.page;
    var render = {
        nav:nav.nav(),
        page:page,
        boardName:boardName+"_comment",
        props:"update",
        footer:footer.footer(),
    }
    res.render('password', render);
});

router.post(`/${boardName}/commentDeleteAuth/:page`,async (req,res)=>{
    var page = req.params.page;
    var body = req.body;
    var pageAuth = new PageAuth(boardName+"_comment",page,body,res);
    var authResult = await pageAuth.pswAuth().then((result)=>{
        return result;
    },(err)=>{
        console.log(`then error ${err}`);
    });

    if(authResult){
        res.send(`
            <script>
                alert("삭제 되었습니다.");
                location.href="/${boardName}/commentDeleteAction/${page}";
            </script>
        `);
    }else{
        res.send(`
            <script>
                alert("비밀번호가 틀립니다.");
                history.back();
            </script>
        `)
    }
});

router.get(`/${boardName}/commentDeleteAction/:page`, async(req,res)=>{
    var page = req.params.page;
    var del = new CommentDelete(boardName,page,res);
    var movePage = await del.movePageValue().then((result)=>{
        return result;
    },(err)=>{
        console.log(`then error movePage ${err}`);
    });
    if(movePage != undefined){
        var deleteResult = await del.deleteAction().then((result)=>{
            res.redirect(`/${boardName}/${movePage}#comment_box_view`);
            return result;
        },(err)=>{
            console.log(`then error deleteResult ${err}`);
        });
    }else{
        console.log("Page Error");
        res.redirect('/');
        return;
    }
});


module.exports = router;