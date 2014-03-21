americano = require('americano');

// The americano plugin wraps the "db.define" JugglingDB function in a simpler "getModel" call
module.exports = Transaction = americano.getModel('transactions', {
    "id": String,
    "title": String,
    "barcode": { "type": String, "default": ""},
    "category": Array,
    "trace_ids": Array,
    "url": { "type": String, "default": ""},
    "comment": { "type": String, "default": ""}
});

// You can easily define here some helpers or method for transactionsTransaction.all = function(callback) {
Transaction.all = function(callback) {
    Transaction.request("all", {}, function(err, transactions) {
       callback(null, transactions);
    });
};