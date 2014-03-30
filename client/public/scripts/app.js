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

;require.register("collections/receipt", function(exports, require, module) {

});

;require.register("collections/receiptdetails", function(exports, require, module) {
var ReceiptDetail, ReceiptDetails;

ReceiptDetail = require("../models/receiptdetail");

module.exports = ReceiptDetails = Backbone.Collection.extend({
  model: ReceiptDetail,
  url: "receiptdetails",
  seed: function() {
    console.log("receipt seeding :D");
    this.create({
      id: "123",
      barcode: "1234567890"
    });
  }
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

;require.register("collections/transactions", function(exports, require, module) {
var Transaction, Transactions;

Transaction = require("../models/transaction");

module.exports = Transactions = Backbone.Collection.extend({
  model: Transaction,
  url: "transactions"
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
  if (mois === 0) {
    mois = "Jan";
  }
  if (mois === 1) {
    mois = "Fev";
  }
  if (mois === 2) {
    mois = "Mar";
  }
  if (mois === 3) {
    mois = "Avr";
  }
  if (mois === 4) {
    mois = "Mai";
  }
  if (mois === 5) {
    mois = "Jun";
  }
  if (mois === 6) {
    mois = "Jui";
  }
  if (mois === 7) {
    mois = "Aou";
  }
  if (mois === 8) {
    mois = "Sep";
  }
  if (mois === 9) {
    mois = "Oct";
  }
  if (mois === 10) {
    mois = "Nov";
  }
  if (mois === 11) {
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

;require.register("models/transaction", function(exports, require, module) {
var Transaction;

module.exports = Transaction = Backbone.Model.extend({});
});

;require.register("router", function(exports, require, module) {
var AppView, ReceiptDetailCollection, Router, TransactionCollection, receiptdetails, transactions;

AppView = require("views/app");

TransactionCollection = require("collections/transactions");

ReceiptDetailCollection = require("collections/receiptdetails");

transactions = new TransactionCollection();

receiptdetails = new ReceiptDetailCollection();

module.exports = Router = Backbone.Router.extend({
  routes: {
    "": "main"
  },
  main: function() {
    var mainView;
    mainView = new AppView({
      collection: transactions,
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
buf.push('<div class="row"><div class="large-8 columns"><h1>Transactions Tracker</h1><p>This application will help you manage your transactions!</p></div><div id="menu" class="large-4 columns"><a id="addtransacbutton" href="#" data-reveal-id="step1" class="success radius button">Ajouter une transaction</a></div></div><div class="row"><table><thead><tr><th width="100%">Title</th><th>Categories</th><th>Barcode</th><th>URL</th><th>Traces</th><th>Comments</th><th>Action</th></tr></thead><tbody></tbody></table><div id="preview" class="panel"><p><em>Selectionnez une transaction</em></p></div></div><footer><div class="row"><div class="text-center columns"><a id="tour" href="#" class="radius button">Visite guidée</a></div><!--<Reveal>Modals begin</Reveal>--><div id="step1" data-reveal="data-reveal" class="reveal-modal"></div><div id="step2" data-reveal="data-reveal" class="reveal-modal"><form data-abide="data-abide"><h2>Etape 2 : Compléter les données récoltées</h2><p>Ajoutez des informations ou éditez celles collectées</p><div id="title"><label>Titre:</label><input type="text" name="title" required="required"/></div><div id="barcode"><label>Code barre:</label><input type="text" name="barcode" required pattern="number"/></div><div id="comment"><label>Comment: (optionel)</label><textarea name="comment"></textarea></div><div id="url"><label>Url: (optionel)</label><input type="text" name="url" pattern="url"/></div><a href="#" id="add-transaction" type="submit" class="success radius button right">Valider la nouvelle transaction</a><a href="#" data-reveal-id="step1" type="submit" id="prev" class="radius button">Retour à l\'étape 1</a></form><a class="close-reveal-modal">×</a></div><!--<Reveal>Modals end</Reveal>--></div></footer><div id="loadbg" class="loading"></div><div class="row loading"><div class="large-offset-5 large-2 small-offset-5 small-2"><div id="circleG"><div id="circleG_1" class="circleG"></div><div id="circleG_2" class="circleG"></div><div id="circleG_3" class="circleG"></div></div></div></div>');
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

;require.register("templates/transaction", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<td><a');
buf.push(attrs({ 'href':("transaction#show/" + (transaction.id) + "") }, {"href":true}));
buf.push('>');
var __val__ = transaction.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td><td><span>');
var __val__ = transaction.category
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><br/><span>');
var __val__ = transaction.subcategory
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><br/><span>');
var __val__ = transaction.subsubcategory
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span><br/></td><td><span>');
var __val__ = transaction.barcode
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></td><td><span>');
var __val__ = transaction.url
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></td><td></td><td><span>');
var __val__ = transaction.comment
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</span></td><td><a class="edit">Editer /</a><a class="delete">Supprimer /</a><a href="#" data-dropdown="drop1" class="dropdown">Dropdown Button<i class="fa fa-caret-down"></i><ul id="drop1" data-dropdown-content="data-dropdown-content" class="f-dropdown"><li><a class="delete">Supprimer</a><li><a href="#">This is another</a><li><a href="#">Yet another</a></li></li></li></ul></a></td>');
}
return buf.join("");
};
});

;require.register("views/app", function(exports, require, module) {
var AppView, Step1, TransactionView;

TransactionView = require("./transaction");

Step1 = require("./modal_step1");

module.exports = AppView = Backbone.View.extend({
  el: "body",
  template: require("../templates/app"),
  events: {
    "click #add-transaction": "createTransaction"
  },
  initialize: function() {
    return this.listenTo(this.collection, "add", this.onTransactionAdded);
  },
  render: function() {
    var appjs, step1;
    this.$el.html(this.template());
    step1 = new Step1();
    step1.render();
    this.collection.fetch();
    appjs = this;
    return $(document).on("opened", "[data-reveal]", function() {
      return appjs.fillFields();
    });
  },
  createTransaction: function(event) {
    event.preventDefault();
    this.collection.create({
      title: this.$el.find("input[name=\"title\"]").val(),
      comment: this.$el.find("textarea[name=\"comment\"]").val(),
      category: this.$el.find("select[name=\"cat\"]").val(),
      subcategory: this.$el.find("select[name=\"subcat\"]").val(),
      subsubcategory: this.$el.find("select[name=\"subsubcat\"]").val(),
      barcode: this.$el.find("input[name=\"barcode\"]").val() || local.selectedItem.barcode,
      url: this.$el.find("input[name=\"url\"]").val()
    });
    return $("#step2").foundation("reveal", "close");
  },
  onTransactionAdded: function(transaction) {
    var transactionView;
    transactionView = new TransactionView({
      model: transaction
    });
    transactionView.render();
    return this.$el.find("tbody").append(transactionView.$el);
  },
  fillFields: function() {
    if (local.selectedItem && local.selectedItem.barcode) {
      $("#barcode input").remove();
      $("#barcode").append(local.selectedItem.barcode);
    }
    if (local.selectedItem && local.selectedItem.name) {
      return $("#title input").val(local.selectedItem.name);
    }
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
        $('.loading').fadeIn();
        return this.listenTo(this.receiptsCollection, "add", this.onReceiptsAdded);
      case "manuel":
        return $("#next").trigger("click");
    }
  },
  onReceiptsAdded: function(model) {
    var opt;
    opt = $("<option>").val(model.get("receiptId")).text(prettyDate(model.get("timestamp")) + " - " + model.get("articlesCount") + " articles");
    this.$("#receipts select").append(opt);
    return $('.loading').fadeOut();
  },
  getReceiptSections: function() {
    $("#receiptelements option").remove();
    $("#detailspreview").hide().html("");
    this.selectedReceiptId = $("#receipt").val();
    this.sectionCollection = new SectionCollection([], {
      receiptId: this.selectedReceiptId
    });
    this.sectionCollection.fetch();
    $('.loading').fadeIn();
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
    return $('.loading').fadeOut();
  },
  updateDetailsPreview: function() {
    var preview;
    $("#detailspreview").hide().html("");
    window.local.selectedItemId = $("#receiptelements select").val();
    window.local.selectedItem = window.local.selectedTicket[window.local.selectedItemId];
    window.local.selectedItem;
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

;require.register("views/transaction", function(exports, require, module) {
var Transaction;

module.exports = Transaction = Backbone.View.extend({
  tagName: "tr",
  template: require("../templates/transaction"),
  events: {
    "click a.delete": "deleteTransaction",
    "click a.edit": "editTransaction"
  },
  render: function() {
    this.$el.html(this.template({
      transaction: this.model.toJSON()
    }));
  },
  deleteTransaction: function() {
    this.model.destroy();
    this.remove();
  },
  editTransaction: function() {
    alert("fonctionnalité à venir");
  }
});
});

;
//# sourceMappingURL=app.js.map