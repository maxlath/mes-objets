ReceiptDetail = require("../models/receiptdetail")
module.exports = ReceiptDetails = Backbone.Collection.extend(
  model: ReceiptDetail
  url: "receiptdetails"
  seed: ->
    console.log "receipt seeding :D"
    @create
      id: "123"
      barcode: "1234567890"

    return
)
