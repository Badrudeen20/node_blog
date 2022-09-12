const multer = require("multer")
module.exports= {
    upload: multer({ 
            storage: multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "storage/post")
                },
                filename: function (req, file, cb) {
                  cb(null, file.originalname)
                }
            }),
            filename: function (req, file, cb) {
                cb(null, file.originalname)
            }
        }).single("mypic"),
    
    
}