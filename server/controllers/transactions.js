Transaction = require('../models/transaction');

module.exports.list = function(req, res) {
    Transaction.all(function(err, transactions) {
        if(err != null) {
            res.send(500, {error: "Couldn't retrieved the transactions."});
        }
        else {
            res.send(200, transactions);
        }
    });
};

// module.exports.show = function(req, res) {
// Transaction.find(req.params.id, function(err, transaction) {
//         if(err != null) {
//             res.send(500, {error: "Transaction couldn't be retrieved -- " + err});
//         }
//         else if(transaction == null) {
//             res.send(404, {error: "Transaction not found"});
//         }
//         else {
//             transaction.destroy(function(err) {
//                 if(err != null) {
//                     res.send(500, {error: "An error has occurred -- " + err});
//                 }
//                 else {
//                     res.send(200);
//                 }
//             });
//         }
//     });
// };



// We define a new route that will handle transaction creation
module.exports.add = function(req, res) {
    Transaction.create(req.body, function(err, transaction) {
        if(err != null) {
            res.send(500, "An error has occurred -- " + err);
        }
        else {
            res.send(201);
        }
    });
};

// We define another route that will handle transaction deletion
module.exports.delete = function(req, res) {
    Transaction.find(req.params.id, function(err, transaction) {
        if(err != null) {
            res.send(500, {error: "Transaction couldn't be retrieved -- " + err});
        }
        else if(transaction == null) {
            res.send(404, {error: "Transaction not found"});
        }
        else {
            transaction.destroy(function(err) {
                if(err != null) {
                    res.send(500, {error: "An error has occurred -- " + err});
                }
                else {
                    res.send(200);
                }
            });
        }
    });
};