americano = require("americano")

# The americano plugin wraps the "db.define" JugglingDB function in a simpler "getModel" call
module.exports = Item = americano.getModel("items",
  id: String
  title: String
  tags: Object
  # {P31: Q571}
  history: Object
  # {last: {from: {id:"https://www.wikidata.org/wiki/Q3153200", label:"intermarché"}, date:"", transaction:"https://www.wikidata.org/wiki/Q194189" }}
  attachements: Object
  # {picture: "", receipt: ""}
  comment:
    type: String
    default: ""
)

# You can easily define here some helpers or method for itemsItem.all = function(callback) {
Item.all = (callback) ->
  Item.request "all", {}, (err, items) ->
    callback null, items
    return

  return