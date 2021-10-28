exports.multer = ()=>{
    var multer = require('multer');
    var path = require('path');
    
    var storage = multer.diskStorage({
        destination : function(req, file, cb){
            cb(null, path.join(__dirname,'../public/upload/img'));
        },
        filename : function(req, file, cb){
            const ext = path.extname(file.originalname);
            cb(null, path.basename("a-company",ext) + new Date().valueOf() + ext);
        }
    });
    
    var upload = multer({storage:storage});

    return upload;
}