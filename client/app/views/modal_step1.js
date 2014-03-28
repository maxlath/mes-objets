ReceiptDetailsCollection = require('../collections/receiptdetails')
SectionCollection = require('../collections/sections');
ReceiptDetailsCollection = require('../collections/receiptdetails')
ReceiptsCollection = require('../collections/receipts')
Preview = require('./preview')


module.exports = ReceiptDetail = Backbone.View.extend({

    el: '#step1',
    template: require('../templates/modal_step1'),

     events: {
        'change #source': 'getProofOptions',
        'change #receipt': 'getReceiptSections',
        'change #receiptelements': 'updateDetailsPreview',
    },

    render: function() {
        this.$el.html(this.template({}))
        $('#sources').fadeIn(1000)
    },

    getProofOptions: function(){
        $('#receiptelements').hide()
        $('#receipts').hide()
        switch($('#source').val()){
            case 'intermarche':
                $('#receipts').fadeIn(1500)
                this.receiptsCollection = new ReceiptsCollection
                this.receiptsCollection.fetch()
                this.listenTo(this.receiptsCollection, "add", this.onReceiptsAdded);
                break;
            case 'manuel':
                $('#next').trigger('click')
                break;
        }
    },




    // SPECIFIQUE INTERMARCHE

    onReceiptsAdded: function(model) {
        opt = $('<option>').val(model.get('receiptId')).text(prettyDate(model.get('timestamp'))+ ' - ' + model.get('articlesCount') + " articles")
        this.$('#receipts select').append(opt)
    },

    getReceiptSections: function(){
        this.selectedReceiptId = $('#receipt').val()
        this.sectionCollection = new SectionCollection([],{receiptId: this.selectedReceiptId})
        this.sectionCollection.fetch()
        this.listenTo(this.sectionCollection, "add", this.onReceiptSections);
        window.local.selectedTicket = {}
    },

    onReceiptSections: function(model) {
        $('#receiptelements')
        $('#receiptelements').fadeIn(1500)
        $('#receiptelements div').fadeIn(1500)
        opt = $('<option>').val(model.id).text((model.get('sectionLabel').upAndDownCase())+' - ' + model.get('name')+' - '+ model.get('price')+'€' )
        this.$('#receiptelements select').append(opt)
        window.local.selectedTicket[model.id] = model.attributes

        listToReorder($('#receiptelements select'),$('#receiptelements select').children('option').get())

    },

    updateDetailsPreview: function(){
        window.local.selectedItemId = $('#receiptelements select').val()
        window.local.selectedItem = window.local.selectedTicket[window.local.selectedItemId]
        preview = new Preview({
            model: window.local.selectedItem
        })
        preview.render()
        $('#detailspreview').fadeIn(500)
        $('#detailspreview div').fadeIn(500)
        // $('#preview_image').error(this.$('#preview_image').hide())
    }
});