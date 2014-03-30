ReceiptDetailsCollection = require("../collections/receiptdetails")
SectionCollection = require("../collections/sections")
ReceiptDetailsCollection = require("../collections/receiptdetails")
ReceiptsCollection = require("../collections/receipts")
Preview = require("./preview")
module.exports = ReceiptDetail = Backbone.View.extend(
  el: "#step1"
  template: require("../templates/modal_step1")
  events:
    "change #source": "getProofOptions"
    "change #receipt": "getReceiptSections"
    "change #receiptelements": "updateDetailsPreview"

  render: ->
    @$el.html @template({})
    $("#sources").fadeIn 1000
    return

  getProofOptions: ->
    $("#receiptelements").hide()
    $("#receipts").hide()
    $("#detailspreview").hide()
    reinitilizeLocalValues()
    switch $("#source").val()
      when "intermarche"
        $("#receipts").fadeIn 1500
        @receiptsCollection = new ReceiptsCollection
        @receiptsCollection.fetch()
        @listenTo @receiptsCollection, "add", @onReceiptsAdded
      when "manuel"
        $("#next").trigger "click"

  
  # SPECIFIQUE INTERMARCHE
  onReceiptsAdded: (model) ->
    opt = $("<option>").val(model.get("receiptId")).text(prettyDate(model.get("timestamp")) + " - " + model.get("articlesCount") + " articles")
    @$("#receipts select").append opt
    return

  getReceiptSections: ->
    $("#receiptelements option").remove()
    $("#detailspreview").hide().html ""
    @selectedReceiptId = $("#receipt").val()
    @sectionCollection = new SectionCollection([],
      receiptId: @selectedReceiptId
    )
    @sectionCollection.fetch()
    @listenTo @sectionCollection, "add", @onReceiptSections
    window.local.selectedTicket = {}
    return

  onReceiptSections: (model) ->
    $ "#receiptelements"
    $("#receiptelements").fadeIn 1500
    $("#receiptelements div").fadeIn 1500
    opt = $("<option>").val(model.id).text((model.get("sectionLabel").upAndDownCase()) + " - " + model.get("name") + " - " + model.get("price") + "€")
    @$("#receiptelements select").append opt
    window.local.selectedTicket[model.id] = model.attributes
    listToReorder $("#receiptelements select"), $("#receiptelements select").children("option").get()
    return

  updateDetailsPreview: ->
    $("#detailspreview").hide().html ""
    window.local.selectedItemId = $("#receiptelements select").val()
    window.local.selectedItem = window.local.selectedTicket[window.local.selectedItemId]
    window.local.selectedItem
    preview = new Preview(model: window.local.selectedItem)
    preview.render()
    $("#detailspreview").fadeIn 500
    $("#detailspreview div").fadeIn 500
    return
)

# $('#preview_image').error(this.$('#preview_image').hide())
