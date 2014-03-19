americano = require('americano');

byTimestamp = function(doc) {
    emit(doc.timestamp, doc);
};

byMonth = function(doc) {
    // group by month
    emit(doc.timestamp.substring(0,7), doc);
};

module.exports = {
    transaction: {
        all: americano.defaultRequests.all
    },

    receiptdetail: {
        all: americano.defaultRequests.all,

        byBarcode : function(doc) {
            emit(doc.barcode, doc);
        },

        byReceiptId : function(doc) {
            if (!doc.receiptId) {
                // Old receiptDetail format.
                //doc.receiptId = doc.ticketId;
                emit(doc.ticketId, doc);
            } else {
                emit(doc.receiptId, doc);
            }
        },
    },

    receipt: {
        byTimestamp : byTimestamp,

        monthTotal : {
            map: byMonth,

            reduce : function(key, values, rereduce) {
                var sums = {
                    total: 0
                };

                for (var idx=0; idx<values.length; idx++) {
                    sums.total += values[idx].total ;
                }
                return sums;
            }
        }
    },

};