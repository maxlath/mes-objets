var AppView = require('views/app');
var TransactionCollection = require('collections/transactions');
var ReceiptDetailCollection = require('collections/receiptdetails');

var transactions = new TransactionCollection();
var receiptdetails = new ReceiptDetailCollection();

module.exports = Router = Backbone.Router.extend({

    routes: {
        '': 'main'
    },

    main: function() {
        var mainView = new AppView({
            collection: transactions,
            receiptcollection: receiptdetails
        });
        mainView.render();
    }
});