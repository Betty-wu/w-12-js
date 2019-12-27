let express = require("express");
let router = express.Router();
let path = require("path");
let fs = require("fs");
router.post("/", (req, res) => {
    console.log(req.files)
    let files = req.files;
    files.forEach(file => {
        let oldpath = path.resolve(file.path);
        let newpath = path.resolve(file.destination, file.originalname);
        fs.renameSync(oldpath, newpath);
    });

    res.json({
        code: 1,
        msg: '成功'
    });
})

module.exports = router;