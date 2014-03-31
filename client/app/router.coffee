AppView = require("views/app")
ItemCollection = require("collections/items")
ReceiptDetailCollection = require("collections/receiptdetails")
items = new ItemCollection()
receiptdetails = new ReceiptDetailCollection()
module.exports = Router = Backbone.Router.extend(
  routes:
    "": "main"

  main: ->
    mainView = new AppView(
      collection: items
      receiptcollection: receiptdetails
    )
    mainView.render()
    return
)