americano = require("americano")

# The americano plugin wraps the "db.define" JugglingDB function in a simpler "getModel" call
module.exports = Item = americano.getModel("items",
  id: String
  item: Object
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

# EXAMPLE WITH THE SEED IN THE COLLECTION
# seed: ->
#     console.log "receipt seeding :D"
#     @create
#       item:
#         label: "Pour l'exemple"
#         wikidata:
#             Q1570277:
#               label:
#                 fr: "Pour l'exemple"
#                 en: "King & Country"
#         barcode: "1234567890"
#       tags:
#         wikidata:
#           P31:
#             Q5294:
#               label:
#                 fr: "DVD"
#                 en: "DVD"
#       attachements:
#         pictures:
#           thumbnail: "http://ecx.images-amazon.com/images/I/51X7fmX0clL._SY300_.jpg"
#       history:
#         last:
#           from:
#             label:
#               fr: 'Intermarché'
#             wikidata: 'Q3153200'
#           transaction:
#             type:
#               label:
#                 fr: "vente"
#               wikidata: "Q194189"
#             date: ((new Date).toJSON())
#       comment:
#         "voici un exemple d'objet ajouté à votre inventaire personnel !"
# )





# You can easily define here some helpers or method for itemsItem.all = function(callback) {
Item.all = (callback) ->
  Item.request "all", {}, (err, items) ->
    callback null, items
    return

  return