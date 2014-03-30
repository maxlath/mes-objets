# The function called from index.html
$(document).ready ->
  app = require("application")
  app.initialize()
  $(document).foundation()
  return

window.reinitilizeLocalValues = ->
  window.local =
    selectedTicket: `undefined`
    selectedItem: `undefined`
    selectedItemId: `undefined`

  $(".dynOption option").remove()
  $(".dynOption").append "<option class=\"option_placeholder\">- Choisissez une option -<option>"
  return

reinitilizeLocalValues()
window.prettyDate = (rawDate) ->
  d = new Date(rawDate)
  jour = d.getDate()
  mois = d.getMonth()
  annee = d.getFullYear()
  heure = d.getHours()
  minute = d.getMinutes()
  minute = "0" + minute  if minute < 10
  jour = "0" + jour  if jour < 10
  mois = "Jan"  if mois is 0
  mois = "Fev"  if mois is 1
  mois = "Mar"  if mois is 2
  mois = "Avr"  if mois is 3
  mois = "Mai"  if mois is 4
  mois = "Jun"  if mois is 5
  mois = "Jui"  if mois is 6
  mois = "Aou"  if mois is 7
  mois = "Sep"  if mois is 8
  mois = "Oct"  if mois is 9
  mois = "Nov"  if mois is 10
  mois = "Dec"  if mois is 11
  jour + "-" + mois + "-" + annee + ", " + heure + ":" + minute

String::upAndDownCase = ->
  @charAt(0).toUpperCase() + @slice(1).toLowerCase()

window.listToReorder = (listToReorder, listitems) ->
  listitems.sort (a, b) ->
    $(a).text().toUpperCase().localeCompare $(b).text().toUpperCase()

  $.each listitems, (idx, itm) ->
    listToReorder.append itm
    return

  return
