AppView = require("views/app")
TransactionCollection = require("collections/transactions")
ReceiptDetailCollection = require("collections/receiptdetails")
transactions = new TransactionCollection()
receiptdetails = new ReceiptDetailCollection()
module.exports = Router = Backbone.Router.extend(
  routes:
    "": "main"

  main: ->
    mainView = new AppView(
      collection: transactions
      receiptcollection: receiptdetails
    )
    mainView.render()
    return
)