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



