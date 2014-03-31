module.exports = ReceiptDetailPreview = Backbone.View.extend(
  el: "div"
  template: require("../templates/preview")

  # events: {
  # 'change #proof_source': 'getProofOptions',
  # 'change #receipt': 'getReceiptSections',
  # 'change #receiptelements': 'updateDetailsPreview'
  # },
  render: ->
    $("#detailspreview").html @template(@model)
    return @
)