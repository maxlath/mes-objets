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
        var Router = require('router');
        this.router = new Router();
        Backbone.history.start();
    }
};
});

;require.register("collections/receiptdetails", function(exports, require, module) {
ReceiptDetail = require('../models/receiptdetail');

module.exports = ReceiptDetails = Backbone.Collection.extend({
    model: ReceiptDetail,
    url: 'receiptdetails',
    seed: function(){
        console.log('receipt seeding :D')
        this.create({
            id: '123',
            barcode: "1234567890"
        })
    }
})

});

;require.register("collections/receipts", function(exports, require, module) {
Receipt = require('../models/receipt');
module.exports = Receipts = Backbone.Collection.extend({
    model: Receipt,
    url: 'receipts'
})
});

;require.register("collections/sections", function(exports, require, module) {
Section = require('../models/section');
module.exports = Sections = Backbone.Collection.extend({

    initialize: function(models, options) {
        this.receiptId = options.receiptId;
    },

    url: function() {
        // return 'receipts/' + this.receiptId + '/sections';
        return 'receipts/' + "5102589" + '/sections';
    },
    model: Section,

});
});

;require.register("collections/transactions", function(exports, require, module) {
Transaction = require('../models/transaction');

module.exports = Transactions = Backbone.Collection.extend({
    model: Transaction,
    url: 'transactions',
    // seed: function(){
    //     // not working
    //     console.log('seeding!')
    //     this.create({
    //         id:"1231512512341512412",
    //         title: "Pelle à picous",
    //         comment: "Très belle pelle",
    //         trace: [
    //                 "intermarché"
    //             ],
    //         category: [
    //             "Bricolage",
    //             "Pelle",
    //             "Pelle à picous"
    //         ],
    //         barcode: "1248193523",
    //         url: "http://pelle-a-picous.love"
    //     });
    // }
});
});

;require.register("initialize", function(exports, require, module) {
// The function called from index.html
$(document).ready(function() {
    var app = require('application');
    app.initialize()

    $(document).foundation();
});
});

;require.register("models/receipt", function(exports, require, module) {
module.exports = Receipt = Backbone.Model.extend({

})
});

;require.register("models/receiptdetail", function(exports, require, module) {
module.exports = ReceiptDetail = Backbone.Model.extend({

})
});

;require.register("models/section", function(exports, require, module) {
module.exports = Section = Backbone.Model.extend({

});
});

;require.register("models/transaction", function(exports, require, module) {
module.exports = Transaction = Backbone.Model.extend({
});
});

;require.register("router", function(exports, require, module) {
var AppView = require('views/app');
var TransactionCollection = require('collections/transactions');
var ReceiptDetailCollection = require('collections/receiptdetails');

var transactions = new TransactionCollection();
var receiptdetails = new ReceiptDetailCollection();

module.exports = Router = Backbone.Router.extend({

    routes: {
        '': 'main'
    },

    main: function() {
        var mainView = new AppView({
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
buf.push('<div class="row"><div class="large-8 columns"><h1>Transactions Tracker</h1><p>This application will help you manage your transactions!</p></div><div class="large-4 columns"><a id="addtransacbutton" href="#" data-reveal-id="step1" class="radius button">Ajouter une transaction</a></div><!--<Reveal>Modals begin</Reveal>--><div id="step1" data-reveal="data-reveal" class="reveal-modal"></div><div id="step2" data-reveal="data-reveal" class="reveal-modal"><form data-abide="data-abide"><h2>Etape 2</h2><p>Editez les informations collectées</p><div class="title"><label>Titre:</label><input type="text" name="title" required="required"/></div><div class="category row collapse"><div class="large-4 columns"><label>Catégorie<select name="cat"><option value="bricolage">Bricolage</option><option value="starbuck">Starbuck</option><option value="hotdog">Hot Dog</option><option value="apollo">Apollo</option></select></label></div><div class="large-4 columns"><label>Sous-catégorie<select name="subcat"><option value="pelle">Pelle</option><option value="husker">Husker</option><option value="starbuck">Starbuck</option><option value="hotdog">Hot Dog</option></select></label></div><div class="large-4 columns"><label>Sous-sous-catégorie<select name="subsubcat"><option value="pelleapicoucontondants">Pelle à picous contondants</option><option value="husker">Husker</option><option value="apollo">Apollo</option><option value="starbuck">Starbuck</option></select></label></div></div><div class="barcode"><label>Code barre:</label><input type="text" name="barcode" required pattern="number"/></div><div class="comment"><label>Comment: (optionel)</label><textarea name="comment"></textarea></div><div class="url"><label>Url:</label><input type="text" name="url" pattern="url"/></div><a href="#" id="add-transaction" type="submit" class="success radius button">Valider la nouvelle transaction</a></form><a class="close-reveal-modal">×</a></div><!--<Reveal>Modals end</Reveal>--></div><div class="row"><table><thead><tr><th width="100%">Title</th><th>Categories</th><th>Barcode</th><th>URL</th><th>Traces</th><th>Comments</th><th>Action</th></tr></thead><tbody></tbody></table><div id="preview" class="panel"><p><em>Selectionnez une transaction</em></p></div></div><div id="barcodes"></div>');
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
buf.push('<h2>Etape 1<p>Choisissez les preuves d\'achat à attacher</p><form><div id="source"><label>Source</label><select id="proof_source" name="proof_source"><option value="null">== Choisissez une source d\'information ==</option><option value="intermarche">Intermarché</option><option value="intermarche">SoGé</option></select></div><div id="receipts"><label>Tickets de caisse</label><select id="receipt" name="receipt"><option value="null">== Choisissez un ticket de caisse ==</option></select></div><div id="receiptelements"><label>Détails du ticket</label><select id="receipt_details" name="receipt_details"><option value="null">== Choisissez une ligne du ticket ==</option></select></div></form><div id="manualbarcode"><span>ou entrer le code bar manuellement<input placeholder="barcode"/></span></div><a href="#" data-reveal-id="step2" type="submit" class="success radius button">Etape 2...</a><a class="close-reveal-modal">×</a></h2>');
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
var TransactionView = require('./transaction');
var Step1 = require('./modal_step1')

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/app'),
    events: {
        "click #add-transaction": "createTransaction"
    },

    // initialize is automatically called once after the view is contructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onTransactionAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());
        var step1 = new Step1()
        step1.render()
        // fetch the transactions from the database
        this.collection.fetch();
        // this.collection.seed()
    },

    createTransaction: function(event) {
        // submit button reload the page, we don't want that
        event.preventDefault();

        // add it to the collection
        this.collection.create({
            title: this.$el.find('input[name="title"]').val(),
            comment: this.$el.find('textarea[name="comment"]').val(),
            trace: [
                    this.$el.find('select[name="proof_source"]').val()
                ],
            category: this.$el.find('select[name="cat"]').val(),
            subcategory: this.$el.find('select[name="subcat"]').val(),
            subsubcategory: this.$el.find('select[name="subsubcat"]').val(),
            barcode: this.$el.find('input[name="barcode"]').val(),
            url: this.$el.find('input[name="url"]').val()

        });
        $('#step2').foundation('reveal', 'close');
    },

    // updateTransaction: function(event) {
    //     var that = this
    //     this.model.save({
    //         barcode: this.$el.find('input[name="barcode"]').val() // ou qqch comme ça
    //     },
    //     // alternative: ajouter un change listner qui rerender le bouzin
    //     {
    //         success: function(){
    //             that.render()
    //         },
    //         error: function(){
    //             console.log('doh!')
    //         }
    //     })
    // },

    onTransactionAdded: function(transaction) {
        // render the specific element
        transactionView = new TransactionView({
            model: transaction
        });
        transactionView.render();
        this.$el.find('tbody').append(transactionView.$el);
    },
});
});

;require.register("views/modal_step1", function(exports, require, module) {
ReceiptDetailsCollection = require('../collections/receiptdetails')
SectionCollection = require('../collections/sections');
ReceiptDetailsCollection = require('../collections/receiptdetails')
ReceiptsCollection = require('../collections/receipts')

module.exports = ReceiptDetail = Backbone.View.extend({

    el: '#step1',
    template: require('../templates/modal_step1'),

     events: {
        'change #proof_source': 'getProofOptions',
        'change #receipt': 'getReceiptSections',
        // 'change #receiptsections': 'getReceiptSectionDetails'
    },

    render: function() {
        this.$el.html(this.template({}))
        $('#source').fadeIn(1000)
    },

    getProofOptions: function(){
        $('#receipts').fadeIn(1500)
        switch($('#proof_source').val()){
            case 'intermarche':
                this.receiptsCollection = new ReceiptsCollection
                this.receiptsCollection.fetch()
                this.listenTo(this.receiptsCollection, "add", this.onReceiptsAdded);


                // this.collection = new ReceiptDetailsCollection
                // this.listenTo(this.collection, "add", this.onReceiptSections);
                // this.collection.seed()
                break;
        }
    },

    onReceiptsAdded: function(model) {
        opt = $('<option>').val(model.get('receiptId')).text(model.get('snippet')+ ' - Nombre d\'articles :'  + model.get('articlesCount'))
        this.$('#receipts select').append(opt)
    },

    getReceiptSections: function(){
        this.selectedReceiptId = $('#receipt').val()
        this.sectionCollection = new SectionCollection([],{receiptId: this.selectedReceiptId})
        this.sectionCollection.fetch()
        this.listenTo(this.sectionCollection, "add", this.onReceiptSections);
    },

    onReceiptSections: function(model) {

        var upAndDownCase = function(string){
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }

        $('#receiptelements').fadeIn(1500)
        opt = $('<option>').val(model.id).text(upAndDownCase(model.get('sectionLabel'))+' - ' + model.get('name')+' - '+ model.get('price')+'€' ).data('details', {
            origin: model.get('origin'),
            order: model.get('order'),
            barcode: model.get('barcode'),
            label: model.get('label'),
            family: model.get('family'),
            familyLabel: model.get('familyLabel'),
            section: model.get('section'),
            sectionLabel: model.get('sectionLabel'),
            amount: model.get('amount'),
            price: model.get('price'),
            type: model.get('type'),
            typeLabel: model.get('typeLabel'),
            receiptId: model.get('receiptId'),
            intermarcheShopId: model.get('intermarcheShopId'),
            timestamp: model.get('timestamp'),
            isOnlineBuy: model.get('isOnlineBuy'),
            aggregatedSection: model.get('aggregatedSection'),
            quantityUnit: model.get('quantityUnit'),
            quantityAmount: model.get('quantityAmount'),
            quantityWeight: model.get('quantityWeight'),
            quantityLabel: model.get('quantityLabel'),
            name: model.get('name')
        })
        this.$('#receiptelements select').append(opt)

        var listToReorder = $('#receiptelements select');
        var listitems = $('#receiptelements select').children('option').get();
        listitems.sort(function(a, b) {
           return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        })
        $.each(listitems, function(idx, itm) { listToReorder.append(itm); });

        // $('#receiptsections').change(model.get('receiptDetails'), function(receiptdetails){

        //     $('#receiptelements').fadeIn(1500)
        //     //         console.log(this)
        //     // );

        // })

    },
});




});

;require.register("views/transaction", function(exports, require, module) {
module.exports = Transaction = Backbone.View.extend({

    tagName: 'tr',
    template: require('../templates/transaction'),
    events: {
        'click a.delete': 'deleteTransaction',
        'click a.edit': 'editTransaction'
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

    editTransaction: function(){
        alert('fonctionnalité à venir')
    }
});
});

;
//# sourceMappingURL=app.js.map