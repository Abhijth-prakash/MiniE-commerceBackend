const multer = require('multer');
const path = require('path');


let upload = multer({
    storage: multer.diskStorage({}),
    limits:{fileSize:500000}
})

module.exports = upload;