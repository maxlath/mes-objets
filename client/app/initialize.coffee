# The function called from index.html
$(document).ready ->
  app = require("application")
  app.initialize()
  $(document).foundation()

window.reinitilizeLocalValues = ->
  window.local =
    selectedTicket: `undefined`
    selectedItem: `undefined`
    selectedItemId: `undefined`

  $(".dynOption option").remove()
  $(".dynOption").append "<option class=\"option_placeholder\">- Choisissez une option -<option>"

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
  switch mois
    when 0 then mois = "Jan"
    when 1 then mois = "Fev"
    when 2 then mois = "Mar"
    when 3 then mois = "Avr"
    when 4 then mois = "Mai"
    when 5 then mois = "Jun"
    when 6 then mois = "Jui"
    when 7 then mois = "Aou"
    when 8 then mois = "Sep"
    when 9 then mois = "Oct"
    when 10 then mois = "Nov"
    when 11 then mois = "Dec"
  return jour + "-" + mois + "-" + annee + ", " + heure + ":" + minute

String::upAndDownCase = ->
  @charAt(0).toUpperCase() + @slice(1).toLowerCase()

window.listToReorder = (listToReorder, listitems) ->
  listitems.sort (a, b) ->
    $(a).text().toUpperCase().localeCompare $(b).text().toUpperCase()

  $.each listitems, (idx, itm) ->
    listToReorder.append itm
    return

  return

window.loaderStart = ->
  $('.loading').fadeIn()
  setTimeout($('.loading').fadeOut(), 5000)