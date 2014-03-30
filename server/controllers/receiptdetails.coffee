ReceiptDetail = require("../models/receiptdetail")
module.exports.list = (req, res) ->
  ReceiptDetail.all (err, receiptdetails) ->
    if err?
      res.send 500,
        error: "Couldn't retrieved the receiptdetails."

    else
      res.send 200, receiptdetails


module.exports.sections = (req, res) ->
  ReceiptDetail.withReceiptId req.params.receiptid, (err, instances) ->
    if err?
      res.send 500, "An error has occurred -- " + err
    else
      res.send 200, instances
      console.log instances