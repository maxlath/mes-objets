Transaction = require("../models/transaction")
module.exports.list = (req, res) ->
  Transaction.all (err, transactions) ->
    if err?
      res.send 500,
        error: "Couldn't retrieved the transactions."

    else
      res.send 200, transactions



# We define a new route that will handle transaction creation
module.exports.add = (req, res) ->
  Transaction.create req.body, (err, transaction) ->
    if err?
      res.send 500, "An error has occurred -- " + err
    else
      res.send 201



# We define another route that will handle transaction deletion
module.exports.del = (req, res) ->
  Transaction.find req.params.id, (err, transaction) ->
    if err?
      res.send 500,
        error: "Transaction couldn't be retrieved -- " + err

    else unless transaction?
      res.send 404,
        error: "Transaction not found"

    else
      transaction.destroy (err) ->
        if err?
          res.send 500,
            error: "An error has occurred -- " + err

        else
          res.send 200

