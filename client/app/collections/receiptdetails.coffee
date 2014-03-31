ReceiptDetail = require("../models/receiptdetail")
module.exports = ReceiptDetails = Backbone.Collection.extend(
  model: ReceiptDetail
  url: "receiptdetails"
)
