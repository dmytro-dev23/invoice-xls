const {STATUS_CODES} = require("http");

module.exports = function (error, req, res, next) {
    const code = error.code || 500;
    const message = error.message || STATUS_CODES[500];
    const data = error.responseData;

    res.status(code)
    res.send({
        message,
        data
    })
}