const {VALIDATION_MESSAGES} = require("./constants");
const Joi = require("joi");

module.exports.stringRequiredSchema = Joi.string().required().messages({
    'any.required': VALIDATION_MESSAGES.REQUIRED,
    'string.base': VALIDATION_MESSAGES.STRING,
})

module.exports.stringSchema = Joi.string().messages({
    'string.base': VALIDATION_MESSAGES.STRING,
})

module.exports.numberRequiredSchema = Joi.number().required().messages({
    'any.required': VALIDATION_MESSAGES.REQUIRED,
    'number.base': VALIDATION_MESSAGES.NUMBER,
})

module.exports.numberSchema = Joi.number().messages({
    'number.base': VALIDATION_MESSAGES.NUMBER,
})