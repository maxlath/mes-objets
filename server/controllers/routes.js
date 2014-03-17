var transactions = require('./transactions');

module.exports = {
    'transactions': {
        get: transactions.list,
        post: transactions.add,
    },
    'transactions/:id': {
        del: transactions.delete
    }
};