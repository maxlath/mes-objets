var transactions = require('./transactions');
var receiptdetails = require('./receiptdetails');

module.exports = {
    'transactions': {
        get: transactions.list,
        post: transactions.add,
    },
    'transactions/:id': {
        del: transactions.delete
    },
    'receiptdetail': {
        get: receiptdetails.list
    }
};