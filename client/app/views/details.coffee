module.exports = ItemDetails = Backbone.View.extend(
  el: "div"
  template: require("../templates/details")

  # events: {
  # 'change #proof_source': 'getProofOptions',
  # 'change #receipt': 'getReceiptSections',
  # 'change #receiptelements': 'updateDetailsPreview'
  # },
  render: ->
    $("#details").html ''
    console.log @model
    $("#details").html @template(@model.toJSON())
    return @
)