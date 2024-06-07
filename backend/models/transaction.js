const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    id: String,
    date: Date,
    sender: {
        firstName: String,
        lastName: String,
        dateOfBirth: String,
        IDNumber: String
    },
    recipient: {
        firstName: String,
        lastName: String,
        email: String,
        accountNumber: String,
        bank: String
    },
    Amount: Number,
    CurrencyCd: String,
    Comments: String,
    status: String
});

module.exports = mongoose.model('Transaction', TransactionSchema);
