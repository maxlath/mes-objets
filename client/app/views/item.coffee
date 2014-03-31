Details = require("./details")

module.exports = Item = Backbone.View.extend(
  tagName: "tr"
  template: require("../templates/item")
  events:
    "click a.delete": "deleteItem"
    "click a.edit": "editItem"
    "click a.itemId": "showDetails"
    "click a.edit": "editPan"

  render: ->
    @$el.html @template(item: @model.toJSON())

  deleteItem: ->
    @model.destroy()
    @remove()

  editItem: ->
    alert "fonctionnalité indisponible pour la version prototype, désolé pour la gène occasionné"

  showDetails: (e)->
    e.preventDefault()

    details = new Details(model: @model)
    details.render()

)
