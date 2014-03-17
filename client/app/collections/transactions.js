Transaction = require('../models/transaction');
module.exports = Transactions = Backbone.Collection.extend({
    model: Transaction,
    url: 'transactions'
});