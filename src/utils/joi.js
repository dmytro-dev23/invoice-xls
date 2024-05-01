const Joi = require('joi');

// Custom validator for YYYY-MM format
module.exports = Joi.extend((joi) => ({
    type: 'customDate',
    base: joi.string(),
    messages: {
        'customDate.format': 'Date must be in the format YYYY-MM',
    },
    validate(value, helpers) {
        if (!/^\d{4}-\d{2}$/.test(value)) {
            return {value, errors: helpers.error('customDate.format')};
        }
        return value;
    },
}));
