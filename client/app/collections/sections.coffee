Section = require("../models/section")
module.exports = Sections = Backbone.Collection.extend(
  initialize: (models, options) ->
    @receiptId = options.receiptId
    return

  url: ->
    "receipts/" + @receiptId + "/sections"

  model: Section
)
