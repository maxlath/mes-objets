ReceiptDetail = require('../models/receiptdetail');

module.exports = ReceiptDetails = Backbone.Collection.extend({
    model: ReceiptDetail,
    url: 'receiptdetails',
    seed: function(){
        console.log('receipt seeding :D')
        this.create({
            id: '123',
            barcode: "1234567890"
        })
    }
})
