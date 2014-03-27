var transactions = require('./transactions');
var receiptdetails = require('./receiptdetails');
var receipts = require('./receipts');

module.exports = {
    'transactions': {
        get: transactions.list,
        post: transactions.add,
    },
    'transactions/:id': {
        // get: transactions.show,
        del: transactions.delete
    },
    'receipts': {
        get: receipts.newest
    },
    'receipts/:receiptid/sections': {
        get: receiptdetails.sections
    },
    'receiptdetails': {
        get: receiptdetails.list
    }
};