const express = require("express");
const {reportsService} = require("../services");
const {bodyValidationMiddleware, filesMiddleware} = require("../utils/middlewares");
const Joi = require("../utils/joi");
const fs = require("fs");

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send('reports');
})

router.post(
    '/upload',
    filesMiddleware(),
    bodyValidationMiddleware(Joi.object({
        invoicingMonth: Joi.customDate().required(),
    })),
    async (req, res, next) => {
        try {
            const result = await reportsService.uploadService(req.file.path, req.body.invoicingMonth);
            res.json(result);
        } catch (error) {
            next(error)
        } finally {
            fs.unlink(req.file.path, () => true);
        }
    },
);

module.exports = router;
