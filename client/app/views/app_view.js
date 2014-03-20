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
            comment: this.$el.find('input[name="comment"]').val(),
            trace: "to be linked",
            category: [
                this.$el.find('select[name="cat"]').val(),
                this.$el.find('select[name="subcat"]').val(),
                this.$el.find('select[name="subsubcat"]').val()
            ],
            barcode: this.$el.find('input[name="barcode"]').val(),
            url: this.$el.find('input[name="url"]').val()

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