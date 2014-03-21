ReceiptDetail = require('../models/receiptdetail');

module.exports.list = function(req, res) {
    ReceiptDetail.all(function(err, receiptdetails) {
        if(err != null) {
            res.send(500, {error: "Couldn't retrieved the receiptdetails."});
        }
        else {
            res.send(200, receiptdetails);
        }
    });
};