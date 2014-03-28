Section = require('../models/section');
module.exports = Sections = Backbone.Collection.extend({

    initialize: function(models, options) {
        this.receiptId = options.receiptId;
    },

    url: function() {
        // return 'receipts/' + this.receiptId + '/sections';
        return 'receipts/' + this.receiptId + '/sections';
    },
    model: Section,

});