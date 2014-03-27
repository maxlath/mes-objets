var TransactionView = require('./transaction');
var Step1 = require('./modal_step1')

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/app'),
    events: {
        "click #add-transaction": "createTransaction"
    },

    // initialize is automatically called once after the view is contructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onTransactionAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());
        var step1 = new Step1()
        step1.render()
        // fetch the transactions from the database
        this.collection.fetch();
        // this.collection.seed()
    },

    createTransaction: function(event) {
        // submit button reload the page, we don't want that
        event.preventDefault();

        // add it to the collection
        this.collection.create({
            title: this.$el.find('input[name="title"]').val(),
            comment: this.$el.find('textarea[name="comment"]').val(),
            trace: [
                    this.$el.find('select[name="proof_source"]').val()
                ],
            category: this.$el.find('select[name="cat"]').val(),
            subcategory: this.$el.find('select[name="subcat"]').val(),
            subsubcategory: this.$el.find('select[name="subsubcat"]').val(),
            barcode: this.$el.find('input[name="barcode"]').val(),
            url: this.$el.find('input[name="url"]').val()

        });
        $('#step2').foundation('reveal', 'close');
    },

    // updateTransaction: function(event) {
    //     var that = this
    //     this.model.save({
    //         barcode: this.$el.find('input[name="barcode"]').val() // ou qqch comme ça
    //     },
    //     // alternative: ajouter un change listner qui rerender le bouzin
    //     {
    //         success: function(){
    //             that.render()
    //         },
    //         error: function(){
    //             console.log('doh!')
    //         }
    //     })
    // },

    onTransactionAdded: function(transaction) {
        // render the specific element
        transactionView = new TransactionView({
            model: transaction
        });
        transactionView.render();
        this.$el.find('tbody').append(transactionView.$el);
    },
});