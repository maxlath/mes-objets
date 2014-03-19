var TransactionView = require('./transaction');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),
    events: {
        "click #add-transaction": "createTransaction"
    },

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onTransactionAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the transactions from the database
        this.collection.fetch();
    },

    createTransaction: function(event) {
        // submit button reload the page, we don't want that
        event.preventDefault();

        // add it to the collection
        this.collection.create({
            title: this.$el.find('input[name="title"]').val(),
            description: this.$el.find('input[name="description"]').val()
        });
    },

    onTransactionAdded: function(transaction) {
        // render the specific element
        transactionView = new TransactionView({
            model: transaction
        });
        transactionView.render();
        this.$el.find('tbody').append(transactionView.$el);
    }
});