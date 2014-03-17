var AppView = require('views/app_view');
var TransactionCollection = require('collections/transactions');

var transactions = new TransactionCollection();

module.exports = Router = Backbone.Router.extend({

    routes: {
        '': 'main'
    },

    main: function() {
        var mainView = new AppView({
            collection: transactions
        });
        mainView.render();
    }
});