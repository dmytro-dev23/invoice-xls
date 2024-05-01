const multer = require("multer");
const {BadRequest} = require("../error");

const upload = multer({dest: 'uploads/', limits: {files: 1}});

module.exports = (file = 'file') => (req, res, next) => upload.single(file)(req, res, (err) => {
    if (err) {
        return next(new BadRequest("File is invalid"));
    }

    next()
})