Item = require("../models/item")
module.exports = Items = Backbone.Collection.extend(
  model: Item
  url: "items"
  seed: ->
    console.log "Hello! Here is an example"
    @create
      item:
        context: "http://respublica.io/schema/items.jsonld"
        label: "Pour l'exemple"
        wikidata:
            Q1570277:
              label:
                fr: "Pour l'exemple"
                en: "King & Country"
        gtin: "1234567890"
      tags:
        wikidata:
          P31:
            Q5294:
              label:
                fr: "DVD"
                en: "DVD"
      attachements:
        pictures:
          thumbnail: "http://ecx.images-amazon.com/images/I/51X7fmX0clL._SY100_.jpg"
      history:
        context: "http://respublica.io/schema/transaction-history.jsonld"
        last:
          from:
            label:
              fr: 'Fnac'
            wikidata: 'Q676585'
          transaction:
            type:
              label:
                fr: "vente"
              wikidata: "Q194189"
            date: ((new Date).toJSON())
      comment:
        "voici un exemple d'objet ajouté à votre inventaire personnel !"
)

# seed: function(){
#     // not working
#     console.log('seeding!')
#     this.create({
#         id:"1231512512341512412",
#         title: "Pelle à picous",
#         comment: "Très belle pelle",
#         trace: [
#                 "intermarché"
#             ],
#         category: [
#             "Bricolage",
#             "Pelle",
#             "Pelle à picous"
#         ],
#         barcode: "1248193523",
#         url: "http://pelle-a-picous.love"
#     });
# }
