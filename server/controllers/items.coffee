Item = require("../models/item")
module.exports.list = (req, res) ->
  Item.all (err, items) ->
    if err?
      res.send 500,
        error: "Couldn't retrieved the items."

    else
      res.send 200, items



# We define a new route that will handle item creation
module.exports.add = (req, res) ->
  Item.create req.body, (err, item) ->
    if err?
      res.send 500, "An error has occurred -- " + err
    else
      res.send 201



# We define another route that will handle item deletion
module.exports.del = (req, res) ->
  Item.find req.params.id, (err, item) ->
    if err?
      res.send 500,
        error: "Item couldn't be retrieved -- " + err

    else unless item?
      res.send 404,
        error: "Item not found"

    else
      item.destroy (err) ->
        if err?
          res.send 500,
            error: "An error has occurred -- " + err

        else
          res.send 200

