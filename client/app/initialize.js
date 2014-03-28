// The function called from index.html
$(document).ready(function() {
    var app = require('application');
    app.initialize()

    $(document).foundation();
});

window.reinitilizeLocalValues = function(){
    window.local = {
        selectedTicket: undefined,
        selectedItem: undefined,
        selectedItemId: undefined
    }
    $('.dynOption option').remove()
    $('.dynOption').append('<option class="option_placeholder">- Choisissez une option -<option>')
}
reinitilizeLocalValues()

window.prettyDate = function(rawDate) {
        d = new Date(rawDate)
        jour = d.getDate()
        mois = d.getMonth()
        annee = d.getFullYear()
        heure = d.getHours()
        minute = d.getMinutes()

        if (minute < 10){ minute = "0" + minute;}
        if (jour < 10){ jour = "0" + jour;}


        if (mois == 0){ mois = "Jan";}
        if (mois == 1){ mois = "Fev";}
        if (mois == 2){ mois = "Mar";}
        if (mois == 3){ mois = "Avr";}
        if (mois == 4){ mois = "Mai";}
        if (mois == 5){ mois = "Jun";}
        if (mois == 6){ mois = "Jui";}
        if (mois == 7){ mois = "Aou";}
        if (mois == 8){ mois = "Sep";}
        if (mois == 9){ mois = "Oct";}
        if (mois == 10){ mois = "Nov";}
        if (mois == 11){ mois = "Dec";}
        return jour + "-" + mois + "-" + annee + ", " + heure + ":" + minute
};


String.prototype.upAndDownCase = function(){
    return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}


window.listToReorder = function(listToReorder,listitems){
    listitems.sort(function(a, b) {
       return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
    })
    $.each(listitems, function(idx, itm) { listToReorder.append(itm); });
}