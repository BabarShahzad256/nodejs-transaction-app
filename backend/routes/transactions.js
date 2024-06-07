const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const { query, validationResult } = require('express-validator');

// GET transactions by date range
router.get('/', [
    query('startDate').isISO8601().toDate().withMessage('Start date must be a valid date'),
    query('endDate').isISO8601().toDate().withMessage('End date must be a valid date')
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    const { startDate, endDate } = req.query;
    try {
        const transactions = await Transaction.find({
            date: { $gte: new Date(startDate), $lte: new Date(endDate) },
            status: { $in: ['COMPLETED', 'IN PROGRESS', 'REJECTED'] }
        }).sort({ date: 1 });
        res.json(transactions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
