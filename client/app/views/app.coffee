ItemView = require("./item")
Step1 = require("./modal_step1")
module.exports = AppView = Backbone.View.extend(
  el: "body"
  template: require("../templates/app")
  events:
    "click #add-item": "createItem"
    "click #joyride": "startTour"

  # initialize is automatically called once after the view is contructed
  initialize: ->
    @listenTo @collection, "add", @onItemAdded

  render: ->

    # we render the template
    @$el.html @template()
    step1 = new Step1()
    step1.render()

    # fetch the items from the database
    @collection.fetch()
    loaderStart()
    setTimeout (=>
      @collection.seed() if @collection.length is 0
      ), 3000

    # this.collection.seed()
    appjs = this
    $(document).on "opened", "[data-reveal]", ->
      appjs.fillFields()


  createItem: (event) ->

    # submit button reload the page, we don't want that
    event.preventDefault()
    # if local.selectedItem.barcode && local.selectedItem.barcode.length > 7

    # add it to the collection
    itemData =
      item:
        context: "http://respublica.io/schema/items.jsonld"
        label: @$el.find("input[name=\"title\"]").val()
        gtin: @$el.find("input[name=\"barcode\"]").val() || local.selectedItem.barcode
        wikidata: undefined
      tags:
        wikidata:
          P31:
            undefined
      attachements:
        pictures:
          thumbnail: undefined
        receipt: local.selectedItem
      history:
        context: "http://respublica.io/schema/transaction-history.jsonld"
        last:
          from:
            label:
              fr: @$el.find("input[name=\"vendor\"]").val() || local.selectedItem.origin
          transaction:
            price: @$el.find("input[name=\"price\"]").val() || local.selectedItem.price
            type:
              label:
                fr: "vente"
              wikidata: "Q194189"
            date: ((new Date).toJSON())
      comment: @$el.find("textarea[name=\"comment\"]").val()

    if local && local.selectedItem
      if local.selectedItem.origin is "Intermarché"
        itemData.history.last.from.label.fr = "Intermarché"
        itemData.history.last.transaction.date = local.selectedItem.timestamp
        itemData.attachements.pictures.thumbnail = "http://drive.intermarche.com/ressources/images/produit/zoom/0#{local.selectedItem.barcode}.jpg"


      if local.rpio?
        itemData.tags = local.rpio.item.wikidata.P31
        itemData.item.respublica_io = local.rpio.item['@id']

    @collection.create itemData
    $("#step2").foundation "reveal", "close"

  # updateItem: function(event) {
  #     var that = this
  #     this.model.save({
  #         barcode: this.$el.find('input[name="barcode"]').val() // ou qqch comme ça
  #     },
  #     // alternative: ajouter un change listner qui rerender le bouzin
  #     {
  #         success: function(){
  #             that.render()
  #         },
  #         error: function(){
  #             console.log('doh!')
  #         }
  #     })
  # },
  onItemAdded: (item) ->

    # render the specific element
    $('.loading').fadeOut()
    itemView = new ItemView(model: item)
    itemView.render()
    @$el.find("tbody").append itemView.$el

  fillFields: ->

    # BARCODE
    if local.selectedItem
      console.log "ENTERED!"
      if local.selectedItem.barcode
        $("#barcode").children('input').remove()
        $("#barcode").children('p').remove()
        $("#barcode").append '<p>' + local.selectedItem.barcode + '<p>'

    #VENDOR
      if local.selectedItem.origin
              $("#vendor").children('input').remove()
              $("#vendor").children('p').remove()
              $("#vendor").append '<p>' + local.selectedItem.origin + '<p>'
    #PRICE
      if local.selectedItem.price
              $("#price").children('input').remove()
              $("#price").children('p').remove()
              $("#price").append '<p>' + local.selectedItem.price + '€ <p>'

    #TITLE
    $("#title input").val local.selectedItem.name.upAndDownCase()  if local.selectedItem and local.selectedItem.name

  startTour: ->
    $(document).foundation('joyride', 'start')

)