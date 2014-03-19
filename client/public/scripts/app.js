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

;require.register("collections/transactions", function(exports, require, module) {
Transaction = require('../models/transaction');
module.exports = Transactions = Backbone.Collection.extend({
    model: Transaction,
    url: 'transactions'
});
});

;require.register("initialize", function(exports, require, module) {
// The function called from index.html
$(document).ready(function() {
    var app = require('application');
    app.initialize()
});

});

;require.register("models/transaction", function(exports, require, module) {
module.exports = Transaction = Backbone.Model.extend({

});
});

;require.register("router", function(exports, require, module) {
var AppView = require('views/app_view');
var TransactionCollection = require('collections/transactions');

var transactions = new TransactionCollection();

module.exports = Router = Backbone.Router.extend({

    routes: {
        '': 'main'
    },

    main: function() {
        var mainView = new AppView({
            collection: transactions
        });
        mainView.render();
    }
});
});

;require.register("templates/home", function(exports, require, module) {
module.exports = function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<div class="large-offset-2 large-8"><h1>Welcome on My Own Transactions</h1><p>This application will help you manage your transactions!</p><form><label>Title:</label><input type="text" name="title"/><label>Url:</label><input type="text" name="url"/><input id="add-transaction" type="submit" value="Add a new transaction" class="button success"/></form><local></local><table><thead><tr><th width="100%">Title</th><th width="150">Action</th></tr></thead><tbody></tbody></table></div>');
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
buf.push(attrs({ 'href':(transaction.url) }, {"href":true}));
buf.push('>');
var __val__ = transaction.title
buf.push(escape(null == __val__ ? "" : __val__));
buf.push('</a></td><td><a class="delete">delete<i class="fa fa-caret-down"></i></a></td>');
}
return buf.join("");
};
});

;require.register("views/app_view", function(exports, require, module) {
var TransactionView = require('./transaction');

module.exports = AppView = Backbone.View.extend({

    el: 'body',
    template: require('../templates/home'),
    events: {
        "click #add-transaction": "createTransaction"
    },

    // initialize is automatically called once after the view is constructed
    initialize: function() {
        this.listenTo(this.collection, "add", this.onTransactionAdded);
    },

    render: function() {

        // we render the template
        this.$el.html(this.template());

        // fetch the transactions from the database
        this.collection.fetch();
    },

    createTransaction: function(event) {
        // submit button reload the page, we don't want that
        event.preventDefault();

        // add it to the collection
        this.collection.create({
            title: this.$el.find('input[name="title"]').val(),
            url: this.$el.find('input[name="url"]').val()
        });
    },

    onTransactionAdded: function(transaction) {
        // render the specific element
        transactionView = new TransactionView({
            model: transaction
        });
        transactionView.render();
        this.$el.find('tbody').append(transactionView.$el);
    }
});
});

;require.register("views/transaction", function(exports, require, module) {
module.exports = Transaction = Backbone.View.extend({

    tagName: 'tr',
    template: require('../templates/transaction'),
    events: {
        'click a.delete': 'deleteTransaction'
    },

    render: function() {
        this.$el.html(this.template({
            transaction: this.model.toJSON()
        }));
    },

    deleteTransaction: function() {
        this.model.destroy();
        this.remove();
    }
});
});

;
//# sourceMappingURL=app.js.map