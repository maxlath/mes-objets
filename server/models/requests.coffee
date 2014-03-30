americano = require("americano")
byTimestamp = (doc) ->
  emit doc.timestamp, doc
  return

byMonth = (doc) ->

  # group by month
  emit doc.timestamp.substring(0, 7), doc
  return

module.exports =
  transaction:
    all: americano.defaultRequests.all

  receiptdetail:
    all: americano.defaultRequests.all
    byBarcode: (doc) ->
      emit doc.barcode, doc
      return

    byReceiptId: (doc) ->
      unless doc.receiptId

        # Old receiptDetail format.
        #doc.receiptId = doc.ticketId;
        emit doc.ticketId, doc
      else
        emit doc.receiptId, doc
      return

  receipt:
    byTimestamp: byTimestamp
    monthTotal:
      map: byMonth
      reduce: (key, values, rereduce) ->
        sums = total: 0
        idx = 0

        while idx < values.length
          sums.total += values[idx].total
          idx++
        sums