americano = require("americano")
module.exports = Receipt = americano.getModel("receipt",
  receiptId: String
  transactionCode: String
  transaction: String
  transactionId: String
  timestamp: Date
  checkoutId: String
  checkoutReceiptId: String
  cashierId: String
  articlesCount: Number
  amount: Number
  loyaltyBalance: Number
  convertedPoints: Number
  acquiredPoints: Number
  intermarcheShopId: String
  total: Number
  paidAmound: Number
  isOnline: Boolean
  snippet: String
)

#Receipt.afterInitialize = function() {
#    this.receiptId = this.receiptId.slice(0, -1);
#    return this;
#};
Receipt.touch = ->
  cbGen = (reqName) ->
    startTime = Date.now()
    ->
      console.log "Touch " + reqName + " in " + (Date.now() - startTime) + "ms"
      return

  params =
    limit: 1
    reduce: false

  Receipt.rawRequest "byTimestamp", params, cbGen("receipt/byTimestamp")
  Receipt.rawRequest "monthTotal", params, cbGen("receipt/monthTotal")
  return

Receipt.newest = (callback) ->
  Receipt.request "byTimestamp",
    descending: true
  , (err, instances) ->
    callback null, instances
    return

  return

Receipt.totalsByMonth = (callback) ->
  Receipt.rawRequest "monthTotal",
    descending: true
    group: true
  , callback
  return