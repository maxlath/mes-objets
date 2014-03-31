module.exports = Item = Backbone.View.extend(
  tagName: "tr"
  template: require("../templates/item")
  events:
    "click a.delete": "deleteItem"
    "click a.edit": "editItem"

  render: ->
    @$el.html @template(item: @model.toJSON())

  deleteItem: ->
    @model.destroy()
    @remove()
  editItem: ->

    alert "fonctionnalité à venir"
)
