items = require("./items")
receiptdetails = require("./receiptdetails")
receipts = require("./receipts")

module.exports =
  "items":
    get: items.list
    post: items.add

  "items/:id":
    # get: items.show,
    del: items.del

  "receipts":
    get: receipts.newest

  "receipts/:receiptid/sections":
    get: receiptdetails.sections

  "receiptdetails":
    get: receiptdetails.list