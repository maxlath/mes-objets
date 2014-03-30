module.exports = Transaction = Backbone.View.extend(
  tagName: "tr"
  template: require("../templates/transaction")
  events:
    "click a.delete": "deleteTransaction"
    "click a.edit": "editTransaction"

  render: ->
    @$el.html @template(transaction: @model.toJSON())
    return

  deleteTransaction: ->
    @model.destroy()
    @remove()
    return

  editTransaction: ->
    alert "fonctionnalité à venir"
    return
)
