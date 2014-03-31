(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
module.exports = {
  initialize: function() {
    var Router;
    Router = require("router");
    this.router = new Router();
    Backbone.history.start();
  }
};
});

;require.register("collections/items", function(exports, require, module) {
var Item, Items;

Item = require("../models/item");

module.exports = Items = Backbone.Collection.extend({
  model: Item,
  url: "items",
  seed: function() {
    console.log("Hello! Here is an example");
    return this.create({
      item: {
        context: "http://respublica.io/schema/items.jsonld",
        label: "Pour l'exemple",
        wikidata: {
          Q1570277: {
            label: {
              fr: "Pour l'exemple",
              en: "King & Country"
            }
          }
        },
        gtin: "1234567890"
      },
      tags: {
        wikidata: {
          P31: {
            Q5294: {
              label: {
                fr: "DVD",
                en: "DVD"
              }
            }
          }
        }
      },
      attachements: {
        pictures: {
          thumbnail: "http://ecx.images-amazon.com/images/I/51X7fmX0clL._SY100_.jpg"
        }
      },
      history: {
        context: "http://respublica.io/schema/transaction-history.jsonld",
        last: {
          from: {
            label: {
              fr: 'Fnac'
            },
            wikidata: 'Q676585'
          },
          transaction: {
            type: {
              label: {
                fr: "vente"
              },
              wikidata: "Q194189"
            },
            date: (new Date).toJSON()
          }
        }
      },
      comment: "voici un exemple d'objet ajouté à votre inventaire personnel !"
    });
  }
});
});

;require.register("collections/receiptdetails", function(exports, require, module) {
var ReceiptDetail, ReceiptDetails;

ReceiptDetail = require("../models/receiptdetail");

module.exports = ReceiptDetails = Backbone.Collection.extend({
  model: ReceiptDetail,
  url: "receiptdetails"
});
});

;require.register("collections/receipts", function(exports, require, module) {
var Receipt, Receipts;

Receipt = require("../models/receipt");

module.exports = Receipts = Backbone.Collection.extend({
  model: Receipt,
  url: "receipts"
});
});

;require.register("collections/sections", function(exports, require, module) {
var Section, Sections;

Section = require("../models/section");

module.exports = Sections = Backbone.Collection.extend({
  initialize: function(models, options) {
    this.receiptId = options.receiptId;
  },
  url: function() {
    return "receipts/" + this.receiptId + "/sections";
  },
  model: Section
});
});

;require.register("initialize", function(exports, require, module) {
$(document).ready(function() {
  var app;
  app = require("application");
  app.initialize();
  return $(document).foundation();
});

window.reinitilizeLocalValues = function() {
  window.local = {
    selectedTicket: undefined,
    selectedItem: undefined,
    selectedItemId: undefined
  };
  $(".dynOption option").remove();
  return $(".dynOption").append("<option class=\"option_placeholder\">- Choisissez une option -<option>");
};

reinitilizeLocalValues();

window.prettyDate = function(rawDate) {
  var annee, d, heure, jour, minute, mois;
  d = new Date(rawDate);
  jour = d.getDate();
  mois = d.getMonth();
  annee = d.getFullYear();
  heure = d.getHours();
  minute = d.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  if (jour < 10) {
    jour = "0" + jour;
  }
  switch (mois) {
    case 0:
      mois = "Jan";
      break;
    case 1:
      mois = "Fev";
      break;
    case 2:
      mois = "Mar";
      break;
    case 3:
      mois = "Avr";
      break;
    case 4:
      mois = "Mai";
      break;
    case 5:
      mois = "Jun";
      break;
    case 6:
      mois = "Jui";
      break;
    case 7:
      mois = "Aou";
      break;
    case 8:
      mois = "Sep";
      break;
    case 9:
      mois = "Oct";
      break;
    case 10:
      mois = "Nov";
      break;
    case 11:
      mois = "Dec";
  }
  return jour + "-" + mois + "-" + annee + ", " + heure + ":" + minute;
};

String.prototype.upAndDownCase = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

window.listToReorder = function(listToReorder, listitems) {
  listitems.sort(function(a, b) {
    return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
  });
  $.each(listitems, function(idx, itm) {
    listToReorder.append(itm);
  });
};

window.loaderStart = function() {
  $('.loading').fadeIn();
  return setTimeout(loaderStop, 5000);
};

window.loaderStop = function() {
  return $('.loading').fadeOut();
};

window.getRespublicaIoData = function(domain, uri) {
  var query, res;
  query = "http://respublica.io/api/" + domain + "/" + uri + ")";
  console.log("querying");
  console.log(query);
  res = $.getJSON(query);
  console.log(res);
  return res.responseJSON;
};
});

;require.register("models/item", function(exports, require, module) {
var Item;

module.exports = Item = Backbone.Model.extend({});
});

;require.register("models/receipt", function(exports, require, module) {
var Receipt;

module.exports = Receipt = Backbone.Model.extend({});
});

;require.register("models/receiptdetail", function(exports, require, module) {
var ReceiptDetail;

module.exports = ReceiptDetail = Backbone.Model.extend({});
});

;require.register("models/section", function(exports, require, module) {
var Section;

module.exports = Section = Backbone.Model.extend({});
});

;require.register("router", function(exports, require, module) {
var AppView, ItemCollection, ReceiptDetailCollection, Router, items, receiptdetails;

AppView = require("views/app");

ItemCollection = require("collections/items");

ReceiptDetailCollection = require("collections/receiptdetails");

items = new ItemCollection();

receiptdetails = new ReceiptDetailCollection();

module.exports = Router = Backbone.Router.extend({
  routes: {
    "": "main"
  },
  main: function() {
    var mainView;
    mainView = new AppView({
      collection: items,
      receiptcollection: receiptdetails
    });
    mainView.render();
  }
});
});

;require.register("templates/app", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<main><div class="row"><div class="large-8 columns"><h1>Mes Objets</h1><p>Centralisez les données de vos achats et objets !</p></div><div id="menu" class="large-4 columns"><a id="additembutton" href="#" data-reveal-id="step1" class="success radius button">Ajouter un objet</a></div></div><div class="row"><table width="100%"><thead><tr><th>Image</th><th>Titre</th><th>Catégories</th><th>Source</th><th>Pièce jointes</th><th>Commentaire</th><th>Action</th></tr></thead><tbody></tbody></table><div id="details" class="panel"><p><em>Selectionnez un objet pour voir ces informations</em></p></div></div></main><footer><div class="row"><div class="text-center columns"><a id="tour" href="#" class="radius button">Visite guidée</a></div></div><div class="row"><div class="text-center columns credits"><a href="http://respublica.io/concours-mesinfos/about">A propos</a></div><!--<Reveal>Modals begin</Reveal>--><div id="step1" data-reveal="data-reveal" class="reveal-modal"></div><div id="step2" data-reveal="data-reveal" class="reveal-modal"><form data-abide="data-abide"><h2>Etape 2 : Compléter les données récoltées</h2><p>Ajoutez des informations ou éditez celles collectées</p><div id="title"><label>Titre:</label><input type="text" name="title" required="required"/></div><div id="barcode"><label>Code barre:</label><input type="text" name="barcode" required pattern="number"/></div><div id="vendor"><label>Vendeur</label><input type="text" name="vendor"/></div><div id="price"><label>Prix</label><input type="text" name="price"/></div><div id="comment"><label>Comment: (optionel)</label><textarea name="comment"></textarea></div><a href="#" id="add-item" type="submit" class="success radius button right">Ajouter l\'objet à l\'inventaire</a><a href="#" data-reveal-id="step1" type="submit" id="prev" class="radius button">Retour à l\'étape 1</a></form><a class="close-reveal-modal">×</a></div><!--<Reveal>Modals end</Reveal>--></div></footer><div id="loadbg" class="loading"></div><div class="row loading"><div class="large-offset-5 large-2 small-offset-5 small-2"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div></div></div>');
}
return buf.join("");
};
});

;require.register("templates/details", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row"><div class="large-6 small-12 columns"><h4>Objet</h4>');
if ( item.label)
{
buf.push('<strong>Nom</strong><p>');
var __val__ = item.label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
if ( comment)
{
buf.push('<strong>Commentaire</strong><p>');
var __val__ = comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
if ( item.gtin)
{
buf.push('<strong>Code barre</strong><p>');
var __val__ = item.gtin
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
buf.push('<hr/><h4>Transaction</h4><p></p>');
if ( history && history.last)
{
if ( history.last.from && history.last.from.label && history.last.from.label.fr)
{
buf.push('<strong>Précedent propriétaire</strong><p>');
var __val__ = history.last.from.label.fr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
if ( history.last.date)
{
buf.push('<strong>date</strong><p>');
var __val__ = history.last.date
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
if ( history.last.type && history.last.type.label)
{
buf.push('<strong>Type de transaction</strong><p>');
var __val__ = history.last.type.label.fr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
if ( history.last.price)
{
buf.push('<strong>Prix</strong><p>');
var __val__ = history.last.price
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</p>');
}
}
buf.push('<hr/><strong>Cet objet sur Wikidata</strong><p></p>');
if ( item.wikidata)
{
if ( item.wikidata.Q1570277.label.fr)
{
buf.push('<a href="https://www.wikidata.org/wiki/Q1570277">' + escape((interp = item.wikidata.Q1570277.label.fr) == null ? '' : interp) + '</a>');
}
// iterate item.wikidata
;(function(){
  if ('number' == typeof item.wikidata.length) {

    for (var v = 0, $$l = item.wikidata.length; v < $$l; v++) {
      var k = item.wikidata[v];

buf.push('<a');
buf.push(attrs({ 'href':("https://www.wikidata.org/wiki/" + (k) + "") }, {"href":true}));
buf.push('>' + escape((interp = v.fr) == null ? '' : interp) + '</a>');
    }

  } else {
    var $$l = 0;
    for (var v in item.wikidata) {
      $$l++;      var k = item.wikidata[v];

buf.push('<a');
buf.push(attrs({ 'href':("https://www.wikidata.org/wiki/" + (k) + "") }, {"href":true}));
buf.push('>' + escape((interp = v.fr) == null ? '' : interp) + '</a>');
    }

  }
}).call(this);

}
if ( tags.wikidata)
{
// iterate tags.wikidata
;(function(){
  if ('number' == typeof tags.wikidata.length) {

    for (var wdid = 0, $$l = tags.wikidata.length; wdid < $$l; wdid++) {
      var P31 = tags.wikidata[wdid];

if ( wdid.label)
{
buf.push('<label>Catégories</label><a');
buf.push(attrs({ 'href':("https://www.wikidata.org/wiki/" + (wdid) + "") }, {"href":true}));
buf.push('>' + escape((interp = wdid.label.fr) == null ? '' : interp) + '</a>');
}
    }

  } else {
    var $$l = 0;
    for (var wdid in tags.wikidata) {
      $$l++;      var P31 = tags.wikidata[wdid];

if ( wdid.label)
{
buf.push('<label>Catégories</label><a');
buf.push(attrs({ 'href':("https://www.wikidata.org/wiki/" + (wdid) + "") }, {"href":true}));
buf.push('>' + escape((interp = wdid.label.fr) == null ? '' : interp) + '</a>');
}
    }

  }
}).call(this);

}
buf.push('<hr/><strong>Cet objet sur OpenFoodFact</strong><hr/><strong>Cet objet sur ProductOpenData</strong><hr/><strong>Cet objet sur Respublica.io</strong></div><div class="large-4 large-offset-2 small-12 columns">');
if ( attachements && attachements.pictures)
{
// iterate attachements.pictures
;(function(){
  if ('number' == typeof attachements.pictures.length) {

    for (var key = 0, $$l = attachements.pictures.length; key < $$l; key++) {
      var value = attachements.pictures[key];

buf.push('<img');
buf.push(attrs({ 'src':("" + (value) + ""), 'alt':("" + (key) + "") }, {"src":true,"alt":true}));
buf.push('/>');
    }

  } else {
    var $$l = 0;
    for (var key in attachements.pictures) {
      $$l++;      var value = attachements.pictures[key];

buf.push('<img');
buf.push(attrs({ 'src':("" + (value) + ""), 'alt':("" + (key) + "") }, {"src":true,"alt":true}));
buf.push('/>');
    }

  }
}).call(this);

}
buf.push('</div></div>');
}
return buf.join("");
};
});

;require.register("templates/item", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<td class="pic">');
if ( item.attachements && item.attachements.pictures)
{
// iterate item.attachements.pictures
;(function(){
  if ('number' == typeof item.attachements.pictures.length) {

    for (var key = 0, $$l = item.attachements.pictures.length; key < $$l; key++) {
      var value = item.attachements.pictures[key];

buf.push('<img');
buf.push(attrs({ 'src':("" + (value) + ""), 'alt':("" + (key) + "") }, {"src":true,"alt":true}));
buf.push('/>');
    }

  } else {
    var $$l = 0;
    for (var key in item.attachements.pictures) {
      $$l++;      var value = item.attachements.pictures[key];

buf.push('<img');
buf.push(attrs({ 'src':("" + (value) + ""), 'alt':("" + (key) + "") }, {"src":true,"alt":true}));
buf.push('/>');
    }

  }
}).call(this);

}
buf.push('</td><td class="title">');
if ( item.item.label)
{
buf.push('<a');
buf.push(attrs({ 'href':("item#show/" + (item.id) + ""), 'id':("" + (item.id) + ""), "class": ("itemId") }, {"href":true,"class":true,"id":true}));
buf.push('>');
var __val__ = item.item.label
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
}
buf.push('</td><td class="tags"><ul>');
if ( item.tags && item.tags.wikidata && item.tags.wikidata.P31)
{
// iterate item.tags.wikidata.P31
;(function(){
  if ('number' == typeof item.tags.wikidata.P31.length) {

    for (var key = 0, $$l = item.tags.wikidata.P31.length; key < $$l; key++) {
      var value = item.tags.wikidata.P31[key];

// iterate value
;(function(){
  if ('number' == typeof value.length) {

    for (var k = 0, $$l = value.length; k < $$l; k++) {
      var v = value[k];

buf.push('<a');
buf.push(attrs({ 'href':("" + (key) + "") }, {"href":true}));
buf.push('>');
var __val__ = v.fr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
    }

  } else {
    var $$l = 0;
    for (var k in value) {
      $$l++;      var v = value[k];

buf.push('<a');
buf.push(attrs({ 'href':("" + (key) + "") }, {"href":true}));
buf.push('>');
var __val__ = v.fr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
    }

  }
}).call(this);

    }

  } else {
    var $$l = 0;
    for (var key in item.tags.wikidata.P31) {
      $$l++;      var value = item.tags.wikidata.P31[key];

// iterate value
;(function(){
  if ('number' == typeof value.length) {

    for (var k = 0, $$l = value.length; k < $$l; k++) {
      var v = value[k];

buf.push('<a');
buf.push(attrs({ 'href':("" + (key) + "") }, {"href":true}));
buf.push('>');
var __val__ = v.fr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
    }

  } else {
    var $$l = 0;
    for (var k in value) {
      $$l++;      var v = value[k];

buf.push('<a');
buf.push(attrs({ 'href':("" + (key) + "") }, {"href":true}));
buf.push('>');
var __val__ = v.fr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a>');
    }

  }
}).call(this);

    }

  }
}).call(this);

}
buf.push('</ul></td><td class="source">');
if ( item.history.last)
{
buf.push('<span>');
var __val__ = item.history.last.from.label.fr
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><span>');
var __val__ = item.history.last.date
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span>');
}
buf.push('</td><td class="attachements"></td><td class="comment"><span>');
var __val__ = item.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></td><td class="actions"><a title="Editer" class="edit disabled"><i class="fa fa-pencil"></i></a><a title="Supprimer" class="delete"><i class="fa fa-times"></i></a></td>');
}
return buf.join("");
};
});

;require.register("templates/modal_step1", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h2>Etape 1 : Attacher des preuves d\'achat</h2><p>Choisissez les données relatives à l\'objet que vous souhaitez ajouter à votre inventaire</p><form><div id="sources" class="fields"><label class="superlab">Source</label><select id="source" name="source"><option value="null">* Choisissez une source d\'information *</option><option value="intermarche">Intermarché</option><option value="manuel">Ajout manuel</option></select></div><div id="receipts" class="fields"><label class="superlab">Tickets de caisse</label><select id="receipt" name="receipt" class="dynOption"><option value="null">* Choisissez un ticket de caisse *</option></select></div><div id="receiptelements" class="fields"><label class="superlab">Détails du ticket<select id="receipt_details" name="receipt_details" class="dynOption"><option value="null">* Choisissez une ligne du ticket *</option></select></label></div><div id="detailspreview" class="panel"></div><div id="additionaldata" class="panel"></div></form><div id="manualbarcode"><span>ou entrer le code bar manuellement<input placeholder="barcode"/></span></div><a href="#" data-reveal-id="step2" type="submit" id="next" class="success radius button right">Etape 2...</a><a class="close-reveal-modal">×</a>');
}
return buf.join("");
};
});

;require.register("templates/preview", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="row"><div class="large-4 small-12 columns"><div class="row"><div class="large-6 small-12 columns"><span><strong>Nom de l\'article</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof name !== "undefined")
{
var __val__ = name
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div><div class="row"><div class="large-6 small-12 columns"><span><strong>Quantité</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof amount !== "undefined")
{
var __val__ = amount
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div><div class="row"><div class="large-6 small-12 columns"><span><strong>Prix</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof price !== "undefined")
{
var __val__ = price + " €"
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div><div class="row"><div class="large-6 small-12 columns"><span><strong>Quantité</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof quantityLabel !== "undefined")
{
var __val__ = quantityLabel
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div><div class="row"><div class="large-6 small-12 columns"><span><strong>Code Barre</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof barcode !== "undefined")
{
var __val__ = barcode
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div><div class="row"><div class="large-6 small-12 columns"><span><strong>Label</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof label !== "undefined")
{
var __val__ = label
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div><div class="row"><div class="large-6 small-12 columns"><span><strong>Section</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof sectionLabel !== "undefined")
{
var __val__ = sectionLabel
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div><div class="row"><div class="large-6 small-12 columns"><span><strong>Identifiant du magasin</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof intermarcheShopId !== "undefined")
{
var __val__ = intermarcheShopId
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div><div class="row"><div class="large-6 small-12 columns"><span><strong>Date</strong></span></div><div class="large-6 small-12 columns"><span>');
if ( typeof timestamp !== "undefined")
{
var __val__ = prettyDate(timestamp)
buf.push(escape(null == __val__ ? "" : __val__));
}
buf.push('</span></div></div></div><div class="large-4 small-12 columns">');
if ( barcode.lenght = 13)
{
buf.push('<img');
buf.push(attrs({ 'src':('http://drive.intermarche.com/ressources/images/produit/zoom/0' + (barcode) + '.jpg'), 'alt':('' + (name) + ''), 'id':('preview_image') }, {"src":true,"alt":true,"id":true}));
buf.push('/>');
}
buf.push('</div></div>');
}
return buf.join("");
};
});

;require.register("views/app", function(exports, require, module) {
var AppView, ItemView, Step1;

ItemView = require("./item");

Step1 = require("./modal_step1");

module.exports = AppView = Backbone.View.extend({
  el: "body",
  template: require("../templates/app"),
  events: {
    "click #add-item": "createItem"
  },
  initialize: function() {
    return this.listenTo(this.collection, "add", this.onItemAdded);
  },
  render: function() {
    var appjs, step1;
    this.$el.html(this.template());
    step1 = new Step1();
    step1.render();
    this.collection.fetch();
    loaderStart();
    setTimeout(((function(_this) {
      return function() {
        if (_this.collection.length === 0) {
          return _this.collection.seed();
        }
      };
    })(this)), 3000);
    appjs = this;
    return $(document).on("opened", "[data-reveal]", function() {
      return appjs.fillFields();
    });
  },
  createItem: function(event) {
    var itemData;
    event.preventDefault();
    itemData = {
      item: {
        context: "http://respublica.io/schema/items.jsonld",
        label: this.$el.find("input[name=\"title\"]").val(),
        gtin: this.$el.find("input[name=\"barcode\"]").val() || local.selectedItem.barcode,
        wikidata: void 0
      },
      tags: {
        wikidata: {
          P31: void 0
        }
      },
      attachements: {
        pictures: {
          thumbnail: void 0
        },
        receipt: local.selectedItem
      },
      history: {
        context: "http://respublica.io/schema/transaction-history.jsonld",
        last: {
          from: {
            label: {
              fr: this.$el.find("input[name=\"vendor\"]").val() || local.selectedItem.origin
            }
          },
          transaction: {
            price: this.$el.find("input[name=\"price\"]").val() || local.selectedItem.price,
            type: {
              label: {
                fr: "vente"
              },
              wikidata: "Q194189"
            },
            date: local.selectedItem.timestamp ||  ((new Date).toJSON())
          }
        }
      },
      comment: this.$el.find("textarea[name=\"comment\"]").val()
    };
    if (local.selectedItem.origin === "Intermarché") {
      itemData.history.last.from.label.fr = "Intermarché";
      itemData.attachements.pictures.thumbnail = "http://drive.intermarche.com/ressources/images/produit/zoom/0" + local.selectedItem.barcode + ".jpg";
    }
    if (local.rpio != null) {
      itemData.tags = local.rpio.item.wikidata.P31;
      itemData.item.respublica_io = local.rpio.item['@id'];
    }
    this.collection.create(itemData);
    return $("#step2").foundation("reveal", "close");
  },
  onItemAdded: function(item) {
    var itemView;
    $('.loading').fadeOut();
    itemView = new ItemView({
      model: item
    });
    itemView.render();
    return this.$el.find("tbody").append(itemView.$el);
  },
  fillFields: function() {
    if (local.selectedItem) {
      if (local.selectedItem.barcode) {
        $("#barcode").children('input').remove();
        $("#barcode").children('p').remove();
        $("#barcode").append('<p>' + local.selectedItem.barcode + '<p>');
      }
      if (local.selectedItem.origin) {
        $("#vendor").children('input').remove();
        $("#vendor").children('p').remove();
        $("#vendor").append('<p>' + local.selectedItem.origin + '<p>');
      }
      if (local.selectedItem.price) {
        $("#price").children('input').remove();
        $("#price").children('p').remove();
        $("#price").append('<p>' + local.selectedItem.price + '€ <p>');
      }
    }
    if (local.selectedItem && local.selectedItem.name) {
      return $("#title input").val(local.selectedItem.name.upAndDownCase());
    }
  }
});
});

;require.register("views/details", function(exports, require, module) {
var ItemDetails;

module.exports = ItemDetails = Backbone.View.extend({
  el: "div",
  template: require("../templates/details"),
  render: function() {
    $("#details").html('');
    console.log(this.model);
    $("#details").html(this.template(this.model.toJSON()));
    return this;
  }
});
});

;require.register("views/item", function(exports, require, module) {
var Details, Item;

Details = require("./details");

module.exports = Item = Backbone.View.extend({
  tagName: "tr",
  template: require("../templates/item"),
  events: {
    "click a.delete": "deleteItem",
    "click a.edit": "editItem",
    "click a.itemId": "showDetails",
    "click a.edit": "editPan"
  },
  render: function() {
    return this.$el.html(this.template({
      item: this.model.toJSON()
    }));
  },
  deleteItem: function() {
    this.model.destroy();
    return this.remove();
  },
  editItem: function() {
    return alert("fonctionnalité indisponible pour la version prototype, désolé pour la gène occasionné");
  },
  showDetails: function(e) {
    var details;
    e.preventDefault();
    details = new Details({
      model: this.model
    });
    return details.render();
  }
});
});

;require.register("views/modal_step1", function(exports, require, module) {
var Preview, ReceiptDetail, ReceiptDetailsCollection, ReceiptsCollection, SectionCollection;

ReceiptDetailsCollection = require("../collections/receiptdetails");

SectionCollection = require("../collections/sections");

ReceiptDetailsCollection = require("../collections/receiptdetails");

ReceiptsCollection = require("../collections/receipts");

Preview = require("./preview");

module.exports = ReceiptDetail = Backbone.View.extend({
  el: "#step1",
  template: require("../templates/modal_step1"),
  events: {
    "change #source": "getProofOptions",
    "change #receipt": "getReceiptSections",
    "change #receiptelements": "updateDetailsPreview"
  },
  render: function() {
    this.$el.html(this.template({}));
    $("#sources").fadeIn(1000);
  },
  getProofOptions: function() {
    $("#receiptelements").hide();
    $("#receipts").hide();
    $("#detailspreview").hide();
    reinitilizeLocalValues();
    switch ($("#source").val()) {
      case "intermarche":
        $("#receipts").fadeIn(1500);
        this.receiptsCollection = new ReceiptsCollection;
        this.receiptsCollection.fetch();
        loaderStart();
        return this.listenTo(this.receiptsCollection, "add", this.onReceiptsAdded);
      case "manuel":
        return $("#next").trigger("click");
    }
  },
  onReceiptsAdded: function(model) {
    var opt;
    opt = $("<option>").val(model.get("receiptId")).text(prettyDate(model.get("timestamp")) + " - " + model.get("articlesCount") + " articles");
    this.$("#receipts select").append(opt);
    return loaderStop();
  },
  getReceiptSections: function() {
    $("#receiptelements option").remove();
    $("#detailspreview").hide().html("");
    this.selectedReceiptId = $("#receipt").val();
    this.sectionCollection = new SectionCollection([], {
      receiptId: this.selectedReceiptId
    });
    this.sectionCollection.fetch();
    loaderStart();
    this.listenTo(this.sectionCollection, "add", this.onReceiptSections);
    return window.local.selectedTicket = {};
  },
  onReceiptSections: function(model) {
    var opt;
    $("#receiptelements");
    $("#receiptelements").fadeIn(1500);
    $("#receiptelements div").fadeIn(1500);
    opt = $("<option>").val(model.id).text((model.get("sectionLabel").upAndDownCase()) + " - " + model.get("name") + " - " + model.get("price") + "€");
    this.$("#receiptelements select").append(opt);
    window.local.selectedTicket[model.id] = model.attributes;
    listToReorder($("#receiptelements select"), $("#receiptelements select").children("option").get());
    return loaderStop();
  },
  updateDetailsPreview: function() {
    var preview;
    console.log("updateprev");
    $("#detailspreview").hide().html("");
    window.local.selectedItemId = $("#receiptelements select").val();
    window.local.selectedItem = window.local.selectedTicket[window.local.selectedItemId];
    if (window.local.selectedItem.barcode.length < 7) {
      delete window.local.selectedItem.barcode;
    } else {
      window.local.rpio = getRespublicaIoData('gtin', local.selectedItem.barcode);
    }
    preview = new Preview({
      model: window.local.selectedItem
    });
    preview.render();
    $("#detailspreview").fadeIn(500);
    return $("#detailspreview div").fadeIn(500);
  }
});
});

;require.register("views/preview", function(exports, require, module) {
var ReceiptDetailPreview;

module.exports = ReceiptDetailPreview = Backbone.View.extend({
  el: "div",
  template: require("../templates/preview"),
  render: function() {
    $("#detailspreview").html(this.template(this.model));
    return this;
  }
});
});

;
//# sourceMappingURL=app.js.map