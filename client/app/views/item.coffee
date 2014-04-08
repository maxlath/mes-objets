Details = require("./details")

module.exports = Item = Backbone.View.extend(
  tagName: "tr"
  template: require("../templates/item")
  events:
    "click a.delete": "deleteItem"
    "click a.edit": "editItem"
    "click td": "showDetails"

  render: ->
    @$el.html @template(item: @model.toJSON())

  deleteItem: (e)->
    e.preventDefault()
    @model.destroy()
    @remove()

  editItem: (e)->
    e.preventDefault()
    alert "La fonction d'édition des objets n'a pas pu être réalisée dans les temps pour le concours MesInfos, elle sera ajouter à la prochaine version. Toutes nos excuses pour la gène occasionnée."

  showDetails: (e)->
    console.log('trigger!!')
    e.preventDefault()

    details = new Details(model: @model)
    details.render()

)
