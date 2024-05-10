const Joi = require("joi");

const {stringRequiredSchema, numberRequiredSchema, numberSchema, stringSchema} = require("../../utils/validation");

const FIELDS_NAMES_ENUM = {
    CUSTOMER_NAME: 'Customer',
    CUST_NUMBER: 'Cust No\'',
    PROJECT_TYPE: 'Project Type',
    HOURS_AMOUNT: "# Hours",
    HOURS_PRICE: 'Hour Price',
    HOURS_PRICE_CURRENCY: 'Hourly Price Currency',
    CONTACT_REFUND: 'Contract Refund',
    INVOICE_TOTAL: 'Invoice Total',
    TOTAL: 'Total',
    INVOICE_CURRENCY: 'Invoice Currency',
    STATUS: 'Status',
    CUSTOMER_PO: 'Customer PO',
    INVOICE_NUMBER: "Invoice #",
    COMMENT: 'Contract Comments',
}

const FIELDS_MAP = {
    [FIELDS_NAMES_ENUM.CUSTOMER_NAME]: 0,
    [FIELDS_NAMES_ENUM.CUST_NUMBER]: 1,
    [FIELDS_NAMES_ENUM.PROJECT_TYPE]: 2,
    [FIELDS_NAMES_ENUM.HOURS_AMOUNT]: 3,
    [FIELDS_NAMES_ENUM.HOURS_PRICE]: 4,
    [FIELDS_NAMES_ENUM.HOURS_PRICE_CURRENCY]: 5,
    [FIELDS_NAMES_ENUM.CONTACT_REFUND]: 6,
    [FIELDS_NAMES_ENUM.TOTAL]: 7,
    [FIELDS_NAMES_ENUM.INVOICE_CURRENCY]: 8,
    [FIELDS_NAMES_ENUM.STATUS]: 9,
    [FIELDS_NAMES_ENUM.CUSTOMER_PO]: 10,
    [FIELDS_NAMES_ENUM.INVOICE_NUMBER]: 11,
    [FIELDS_NAMES_ENUM.COMMENT]: 12,
}

const CURRENCY_RATES = {
    USD: 'B2',
    EUR: 'B3',
    GBP: 'B4',
}

const INVOICE_STATUSES = {
    DONE: 'Done',
    READY: 'Ready',
}


const FIELDS_SCHEMA = Joi.object({
    [FIELDS_NAMES_ENUM.CUSTOMER_NAME]: stringRequiredSchema,
    [FIELDS_NAMES_ENUM.CUST_NUMBER]: numberRequiredSchema,
    [FIELDS_NAMES_ENUM.PROJECT_TYPE]: stringRequiredSchema,
    [FIELDS_NAMES_ENUM.HOURS_AMOUNT]: numberRequiredSchema,
    [FIELDS_NAMES_ENUM.HOURS_PRICE]: numberRequiredSchema,
    [FIELDS_NAMES_ENUM.HOURS_PRICE_CURRENCY]: stringRequiredSchema,
    [FIELDS_NAMES_ENUM.CONTACT_REFUND]: numberSchema,
    [FIELDS_NAMES_ENUM.INVOICE_TOTAL]: numberSchema,
    [FIELDS_NAMES_ENUM.TOTAL]: numberRequiredSchema,
    [FIELDS_NAMES_ENUM.INVOICE_CURRENCY]: stringRequiredSchema,
    [FIELDS_NAMES_ENUM.STATUS]: stringRequiredSchema,
    [FIELDS_NAMES_ENUM.CUSTOMER_PO]: stringSchema,
    [FIELDS_NAMES_ENUM.INVOICE_NUMBER]: stringSchema,
    [FIELDS_NAMES_ENUM.COMMENT]: stringSchema,
})

const FILE_SCHEMA = {
    DATE: {pos: {row: 0, cell: 0}},
    USD_RATE: {pos: {row: 1, cell: 0}, value: 'USD Rate'},
    EUR_RATE: {pos: {row: 2, cell: 0}, value: 'EUR Rate'},
    GPB_RATE: {pos: {row: 3, cell: 0}, value: 'GPB Rate'},
    CUSTOMER_NAME: {
        pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.CUSTOMER_NAME]},
        value: FIELDS_NAMES_ENUM.CUSTOMER_NAME
    },
    CUST_NUMBER: {pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.CUST_NUMBER]}, value: FIELDS_NAMES_ENUM.CUST_NUMBER},
    PROJECT_TYPE: {
        pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.PROJECT_TYPE]},
        value: FIELDS_NAMES_ENUM.PROJECT_TYPE
    },
    HOURS_AMOUNT: {
        pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.HOURS_AMOUNT]},
        value: FIELDS_NAMES_ENUM.HOURS_AMOUNT
    },
    HOURS_PRICE: {pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.HOURS_PRICE]}, value: FIELDS_NAMES_ENUM.HOURS_PRICE},
    HOURS_PRICE_CURRENCY: {
        pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.HOURS_PRICE_CURRENCY]},
        value: FIELDS_NAMES_ENUM.HOURS_PRICE_CURRENCY
    },
    CONTACT_REFUND: {
        pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.CONTACT_REFUND]},
        value: FIELDS_NAMES_ENUM.CONTACT_REFUND
    },
    TOTAL: {pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.TOTAL]}, value: FIELDS_NAMES_ENUM.TOTAL},
    INVOICE_CURRENCY: {
        pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.INVOICE_CURRENCY]},
        value: FIELDS_NAMES_ENUM.INVOICE_CURRENCY
    },
    STATUS: {pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.STATUS]}, value: FIELDS_NAMES_ENUM.STATUS},
    CUSTOMER_PO: {pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.CUSTOMER_PO]}, value: FIELDS_NAMES_ENUM.CUSTOMER_PO},
    INVOICE_NUMBER: {
        pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.INVOICE_NUMBER]},
        value: FIELDS_NAMES_ENUM.INVOICE_NUMBER
    },
    COMMENT: {pos: {row: 4, cell: FIELDS_MAP[FIELDS_NAMES_ENUM.COMMENT]}, value: FIELDS_NAMES_ENUM.COMMENT},
}

module.exports = {
    DATE_SELL: "A1",
    FIELDS_NAMES_ENUM,
    FIELDS_MAP,
    CURRENCY_RATES,
    INVOICE_STATUSES,
    FIELDS_SCHEMA,
    FILE_SCHEMA,
}