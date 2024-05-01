const {BadRequest} = require("../error");

module.exports = (schema) => function (req, res, next) {
    const validationData = schema.validate(req.body, {abortEarly: false});

    const error = validationData.error?.details;

    if (error) {
        throw new BadRequest("Bad request", error)
    }

    next()
}