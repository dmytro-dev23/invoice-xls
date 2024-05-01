const {STATUS_CODES} = require("http");

class HttpError extends Error {
    constructor(code, message, data) {
        let _message = STATUS_CODES[500];

        if (message) {
            _message = message
        } else if (STATUS_CODES[code]) {
            _message = STATUS_CODES[code]
        }

        super(_message);

        this.code = code;
        this.responseData = data;
    }
}

class BadRequest extends HttpError {
    constructor(message = STATUS_CODES.BAD_REQUEST, data) {
        super(400, message, data);
    }
}

module.exports = {
    HttpError,
    BadRequest
}