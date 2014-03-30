ReceiptDetail = require("../models/receiptdetail")
Receipt = require("../models/receipt")
async = require("async")
module.exports.newest = (req, res) ->
  Receipt.newest (err, instances) ->
    console.log "Receipt.newest"
    console.log instances
    if err?
      res.send 500, "An error has occurred -- " + err
    else
      res.send 200, instances


module.exports.totalsByMonth = (req, res) ->
  Receipt.totalsByMonth (err, instances) ->
    if err?
      res.send 500, "An error has occurred -- " + err
    else
      res.send 200, instances



# total,
# foodTotal,
# notFoodTotal,
#
# sectionsCount : [
#   { section : ID,
#    sectionLabel : ...},
#   ... (2, 3)
# ],
#
# topProduct : {
#    count,
#    total,
#    ''receiptDetail'' },
# sectionsTotal : [
#  { section : ID,
#    sectionLabel : ...},
#     ....
# }
module.exports.totalsOfMonth = (req, res) ->
  month = req.params.month
  data =
    total: 0
    foodTotal: 0
    notFoodTotal: 0

  kv2Section = (kv) ->
    section: kv.key[1]
    sectionLabel: ReceiptDetail.getSectionLabel(kv.key[1])
    count: kv.value.count
    total: kv.value.total

  async.parallel [ (callback) ->

    # Top product :
    # 1. count, total, barcode :
    ReceiptDetail.mostBoughtProductOfMonth month, (err, topProd) ->
      topProduct =
        count: topProd.value.count
        total: topProd.value.total

      data.topProduct = topProduct

      # 2. receiptdetails :
      ReceiptDetail.getOneByBarCode topProd.key[1], (err, rdet) ->
        topProduct.receiptDetail = rdet[0]
        callback null



  # Sections
  , (callback) ->
    ReceiptDetail.sectionsTotalsOfMonth month, (err, sections) ->

      # Sort by count, take the 3 first.
      sections.sort (kvA, kvB) ->
        a = kvA.value.count
        b = kvB.value.count
        if a < b
          1
        else if a > b
          -1
        else
          0

      data.sectionsCount = sections.slice(0, 3).map(kv2Section)

      # Sort by total,
      sections.sort (kvA, kvB) ->
        a = kvA.value.total
        b = kvB.value.total
        if a < b
          1
        else if a > b
          -1
        else
          0

      data.sectionsTotal = sections.map(kv2Section)

      # Aggragate total by food, no food.
      sections.map (kv) ->
        total = kv.value.total
        data.total += total
        unless [ "12", "10", "38", "28", "30", "22", "32", "20", "34", "26", "24", "2", "46", "4", "6", "8", "40", "42" ].indexOf(kv.key[1]) is -1
          data.foodTotal += total
        else
          data.notFoodTotal += total

      callback null

   ], (err, results) ->
    if err?
      res.send 500, "An error has occurred -- " + err
    else
      res.send 200, data
