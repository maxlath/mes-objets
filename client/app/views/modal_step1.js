ReceiptDetailsCollection = require('../collections/receiptdetails')
SectionCollection = require('../collections/sections');
ReceiptDetailsCollection = require('../collections/receiptdetails')
ReceiptsCollection = require('../collections/receipts')
Preview = require('./preview')


module.exports = ReceiptDetail = Backbone.View.extend({

    el: '#step1',
    template: require('../templates/modal_step1'),

     events: {
        'change #proof_source': 'getProofOptions',
        'change #receipt': 'getReceiptSections',
        'change #receiptelements': 'updateDetailsPreview',
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
                break;
            case 'manuel':
                $('#next').trigger('click')

        }
    },

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

        var upAndDownCase = function(string){
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }

        $('#receiptelements').fadeIn(1500)
        $('#receiptelements div').fadeIn(1500)
        opt = $('<option>').val(model.id).text(upAndDownCase(model.get('sectionLabel'))+' - ' + model.get('name')+' - '+ model.get('price')+'€' )
        this.$('#receiptelements select').append(opt)
        window.local.selectedTicket[model.id] = model.attributes

        // $('#detailspreview div').fadeIn(1500)


        var listToReorder = $('#receiptelements select');
        var listitems = $('#receiptelements select').children('option').get();
        listitems.sort(function(a, b) {
           return $(a).text().toUpperCase().localeCompare($(b).text().toUpperCase());
        })
        $.each(listitems, function(idx, itm) { listToReorder.append(itm); });
    },

    updateDetailsPreview: function(){
        window.local.selectedItemId = $('#receiptelements select').val()
        console.log(window.local.selectedItemId)
        window.local.selectedItem = window.local.selectedTicket[window.local.selectedItemId]
        console.log(window.local.selectedItem)
        preview = new Preview({
            model: window.local.selectedItem
        })
        preview.render()
        $('#detailspreview').fadeIn(500)
        $('#detailspreview div').fadeIn(500)
        // $('#preview_image').error(this.$('#preview_image').hide())
    }
});



