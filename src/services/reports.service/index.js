const {XLSX, getValidationErrors, validateFileSchema, toDate, calculateInvoiceTotal, getRate} = require("./utils");
const {
    DATE_SELL,
    CURRENCY_RATES,
    FIELDS_MAP,
    FIELDS_NAMES_ENUM,
    INVOICE_STATUSES,
} = require("./constants");
const {BadRequest} = require("../../utils/error");

module.exports.uploadService = async (filePath, invoicingMonth) => {
    const xlsx = new XLSX(filePath);

    const fileSchemaValidationErrors = validateFileSchema(xlsx);

    if (fileSchemaValidationErrors) {
        throw new BadRequest("File structure is invalid", fileSchemaValidationErrors);
    }

    const fileInvoicingMonth = xlsx.getSellByAddress(DATE_SELL);

    if (toDate(fileInvoicingMonth).getTime() !== toDate(invoicingMonth).getTime()) {
        throw new BadRequest("invoicingMonth is invalid");
    }

    const currencyRates = {
        USD: xlsx.getSellByAddress(CURRENCY_RATES.USD),
        EUR: xlsx.getSellByAddress(CURRENCY_RATES.EUR),
        GBP: xlsx.getSellByAddress(CURRENCY_RATES.GBP),
    }

    const invoicesDataMap = new Map();

    xlsx.mapRows(
        (row, index) => {
            const rowData = {
                [FIELDS_NAMES_ENUM.CUSTOMER_NAME]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.CUSTOMER_NAME]),
                [FIELDS_NAMES_ENUM.CUST_NUMBER]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.CUST_NUMBER]),
                [FIELDS_NAMES_ENUM.PROJECT_TYPE]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.PROJECT_TYPE]),
                [FIELDS_NAMES_ENUM.HOURS_AMOUNT]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.HOURS_AMOUNT]),
                [FIELDS_NAMES_ENUM.HOURS_PRICE]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.HOURS_PRICE]),
                [FIELDS_NAMES_ENUM.HOURS_PRICE_CURRENCY]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.HOURS_PRICE_CURRENCY]),
                [FIELDS_NAMES_ENUM.CONTACT_REFUND]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.CONTACT_REFUND]),
                [FIELDS_NAMES_ENUM.TOTAL]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.TOTAL]),
                [FIELDS_NAMES_ENUM.INVOICE_CURRENCY]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.INVOICE_CURRENCY]),
                [FIELDS_NAMES_ENUM.STATUS]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.STATUS]),
                [FIELDS_NAMES_ENUM.CUSTOMER_PO]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.CUSTOMER_PO]),
                [FIELDS_NAMES_ENUM.INVOICE_NUMBER]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.INVOICE_NUMBER]),
                [FIELDS_NAMES_ENUM.COMMENT]:
                    xlsx.getBySellCords(row, FIELDS_MAP[FIELDS_NAMES_ENUM.COMMENT]),
            };

            if (!Object.values(rowData).filter((x) => !!x).length) {
                return;
            }

            if (!(rowData[FIELDS_NAMES_ENUM.STATUS] === INVOICE_STATUSES.READY || rowData[FIELDS_NAMES_ENUM.INVOICE_NUMBER])) {
                return;
            }

            rowData[FIELDS_NAMES_ENUM.INVOICE_TOTAL] = calculateInvoiceTotal(
                rowData[FIELDS_NAMES_ENUM.TOTAL],
                getRate(
                    currencyRates,
                    rowData[FIELDS_NAMES_ENUM.INVOICE_CURRENCY],
                )
            )

            rowData.validationErrors = getValidationErrors(rowData);

            invoicesDataMap.set(index, rowData);
        },
        5,
    )

    const invoicesRows = [...invoicesDataMap.entries()]
        .sort(([a], [b]) => a > b ? 1 : -1)
        .map(([, row]) => row);


    return {
        invoicingMonth: new Date(fileInvoicingMonth).toISOString().slice(0, 7),
        currencyRates: currencyRates,
        invoicesData: invoicesRows,
    };
}