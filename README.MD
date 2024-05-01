Invoices XLS parsing

You have a table with some invoices data:

https://docs.google.com/spreadsheets/d/1EzSQiC6vv80RCzbE1C1noN5YJd43Ip2K/edit?usp=sharing&ouid=111810151834131963227&rtpof=true&sd=true

Need to write NodeJS code + ExpressJS which can process the file, it should have a single endpoint for file upload where
user can pass the XLS file and define the “invoicingMonth” in a format YYYY-MM.

Only relevant lines should be processed. A relevant line is a line with status ready or a line that has invoice #
filled.

As output endpoint should return the data in a format like:

```
{
    InvoicingMonth: “YYYY-MM” - from the file,
    currencyRates: {
      USD: 
      EUR:
      GBP: 
    },
    invoicesData: [
       .. all the invoices data, columns according to the file…
     ]
    }
}
```

In addition, invoicesData records should have additional column validationErrors which contains all the line validation
errors, assuming:
Mandatory fields: Customer, Cust No', Project Type, # Hours, Hour Price,Hourly Price Currency, Total, Invoice Currency,
Status;
Add any relevant validations you think is necessary, based on the input data analysis;
When no validation errors - keep validationErrors empty;

Add generic validation before parsing to make sure that file structure is valid.
Make sure that invoicing date in the XLS file matches with invoicing date passed during upload.

