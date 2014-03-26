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