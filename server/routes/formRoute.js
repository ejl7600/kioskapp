const express = require('express');
const model = require('../model/formModel')

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const requestData = req.body;
        const promise = await model.addSubmission(requestData)
        res.status(200).json({ success: promise.success})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;