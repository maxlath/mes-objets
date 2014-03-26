ReceiptDetailsCollection = require('../collections/receiptdetails')

module.exports = ReceiptDetail = Backbone.View.extend({

    el: '#step1',
    template: require('../templates/modal_step1'),

     events: {
        'show #proof_source': 'getOptionValues',
        'change #proof_source': 'getOptionValues'
    },

    render: function() {
        this.$el.html(this.template({}));
    },

    onReceiptDetailsAdded: function(model) {
        opt = $('<option>').val(model.id).text(model.get('barcode'))
        this.$('#receiptelements select').append(opt)
    },

    getOptionValues: function(){
        console.log('hello getOptionValues')
        switch($('#proof_source').val()){
            case 'intermarche':
                this.collection = new ReceiptDetailsCollection
                this.collection.fetch()
                this.listenTo(this.collection, "add", this.onReceiptDetailsAdded);
                // this.collection.seed()
                break;
        }
    }
});