transactions = require("./transactions")
receiptdetails = require("./receiptdetails")
receipts = require("./receipts")

module.exports =
  "transactions":
    get: transactions.list
    post: transactions.add

  "transactions/:id":
    # get: transactions.show,
    del: transactions.del

  "receipts":
    get: receipts.newest

  "receipts/:receiptid/sections":
    get: receiptdetails.sections

  "receiptdetails":
    get: receiptdetails.list