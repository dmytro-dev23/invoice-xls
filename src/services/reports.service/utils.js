const xlsx = require("xlsx");
const {FIELDS_SCHEMA, FILE_SCHEMA} = require("./constants");
const Joi = require("joi");

class XLSX {
    constructor(filePath) {
        this.workbook = xlsx.readFile(filePath);
        this.sheetName = this.workbook.SheetNames[0];
        this.worksheet = this.workbook.Sheets[this.sheetName];
        this.range = xlsx.utils.decode_range(this.worksheet['!ref']);
    }


    getSellByAddress(sell) {
        return this.worksheet[sell]?.v
    }

    getBySellCords(row, column) {
        return this.worksheet[xlsx.utils.encode_cell({r: row, c: column})]?.v
    }

    mapRows(cb, startRow = 0) {
        for (let rowNum = startRow; rowNum <= this.range.e.r; rowNum++) {
            cb(rowNum, rowNum - startRow)
        }
    }
}


const getValidationErrors = (invoice) => {
    const validation = FIELDS_SCHEMA.validate(invoice, {abortEarly: false});

    return validation.error?.details
        ?.map(({context, message}) => ({[context.key]: message}))
        .reduce((acc, obj) => Object.assign(acc, obj), {});
};

const calculateInvoiceTotal = (total, rate) => {
    if (!total || !rate) {
        return NaN;
    }

    return total * rate;
};

const getRate = (rates, _currency) => {
    const currency = String(_currency).trim().toUpperCase();

    const rate = rates[currency];

    if (!rate) {
        return NaN;
    }

    return rate;
};

const getFileValidationSchema = (exactValue) => exactValue ? Joi.string().required().valid(exactValue).insensitive() : Joi.string().required();

const validateFileSchema = (xlsx) => {
    const {data, validationSchema} = Object.entries(FILE_SCHEMA).reduce(
        (acc, [key, {value, pos}]) => {
            acc.data[key] = xlsx.getBySellCords(pos.row, pos.cell)
            acc.validationSchema[key] = getFileValidationSchema(value);

            return acc;
        },
        {data: {}, validationSchema: {}}
    );

    const schema = Joi.object(validationSchema);

    const validationData = schema.validate(data, {abortEarly: false});

    return validationData.error?.details;
}

const toDate = (str) => {
    const date = new Date(str);

    return new Date(date.getFullYear(), date.getMonth())
}

module.exports = {
    XLSX,
    getValidationErrors,
    validateFileSchema,
    toDate,
    calculateInvoiceTotal,
    getRate,
}