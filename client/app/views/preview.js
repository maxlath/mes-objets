module.exports = ReceiptDetailPreview = Backbone.View.extend({

    el: 'div',
    template: require('../templates/preview'),

     // events: {
        // 'change #proof_source': 'getProofOptions',
        // 'change #receipt': 'getReceiptSections',
        // 'change #receiptelements': 'updateDetailsPreview'
    // },

    render: function() {
        $('#detailspreview').html(this.template(this.model));
        console.log(this.model)
        console.log("RENDER")
        return this;
    }
})