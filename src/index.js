const express = require('express');
const router = require("./router");

const {errorHandlerMiddleware} = require("./utils/middlewares");

const app = express();
const PORT = 3000;

app.use('/api', router);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});