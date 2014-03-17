americano = require('americano');

// The americano plugin wraps the "db.define" JugglingDB function in a simpler "getModel" call
module.exports = Transaction = americano.getModel('transactions', {
    "id": String,
    "title": String,
    "url": { "type": String, "default": ""}
});

// You can easily define here some helpers or method for transactionsTransaction.all = function(callback) {
Transaction.all = function(callback) {
    Transaction.request("all", {}, function(err, transactions) {
       callback(null, transactions);
    });
};