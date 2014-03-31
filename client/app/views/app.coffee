ItemView = require("./item")
Step1 = require("./modal_step1")
module.exports = AppView = Backbone.View.extend(
  el: "body"
  template: require("../templates/app")
  events:
    "click #add-item": "createItem"


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

    # this.collection.seed()
    appjs = this
    $(document).on "opened", "[data-reveal]", ->
      appjs.fillFields()


  createItem: (event) ->

    # submit button reload the page, we don't want that
    event.preventDefault()

    # add it to the collection
    @collection.create
      title: @$el.find("input[name=\"title\"]").val()
      comment: @$el.find("textarea[name=\"comment\"]").val()
      # attachement: {
      #   receipt:
      #         this.$el.find('select[name="proof_source"]').val()
      #         // window.local.selectedItem.origin
      #     ],
      # }
      category: @$el.find("select[name=\"cat\"]").val()
      subcategory: @$el.find("select[name=\"subcat\"]").val()
      subsubcategory: @$el.find("select[name=\"subsubcat\"]").val()
      barcode: @$el.find("input[name=\"barcode\"]").val() || local.selectedItem.barcode,
      url: @$el.find("input[name=\"url\"]").val()

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
    if local.selectedItem and local.selectedItem.barcode
      $("#barcode").children('input').remove()
      $("#barcode").children('p').remove()
      $("#barcode").append '<p>' + local.selectedItem.barcode + '<p>'

    # $.getJSON()
    $("#title input").val local.selectedItem.name  if local.selectedItem and local.selectedItem.name
)