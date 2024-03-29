/*
 * File: app/controller/CardController.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('Finappsparty.controller.CardController', {
    extend: 'Ext.app.Controller',

    config: {
        control: {
            "#closeCardPanel": {
                tap: 'onCloseCardPanelTap'
            },
            "#accountButton": {
                tap: 'onAccountButtonTap'
            },
            "#payCardButton": {
                tap: 'onPayCardButtonTap'
            },
            "#cardPanel": {
                initialize: 'onCardPanelInitialize'
            },
            "#cardCarousel": {
                activeitemchange: 'onCardCarouselActiveItemChange'
            },
            "#payOrderCancelButton": {
                tap: 'onPayOrderCancelButtonTap'
            },
            "#payOrderOkButton": {
                tap: 'onPayOrderOkButtonTap'
            }
        }
    },

    onCloseCardPanelTap: function(button, e, options) {
        this.getApplication().getController('LoginController').showLogin();
    },

    onAccountButtonTap: function(button, e, options) {
        this.getApplication().getController('MainController').changeView('directTransfer');
    },

    onPayCardButtonTap: function(button, e, options) {
        this.searchCommerce();
    },

    onCardPanelInitialize: function(component, options) {
        this.createCardSelectCarousel();
    },

    onCardCarouselActiveItemChange: function(container, value, oldValue, options) {
        this.setCard(container);
    },

    onPayOrderCancelButtonTap: function(button, e, options) {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: ' Pay cancelled ',
            indicator: false
        });
        setTimeout(function(){
            Ext.Viewport.setMasked(false);
            Ext.getCmp('payOrder').hide();
        },1000);
    },

    onPayOrderOkButtonTap: function(button, e, options) {
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: ' Pay Ok ',
            indicator: false
        });
        setTimeout(function(){
            Ext.Viewport.setMasked(false);
            Ext.getCmp('payOrder').hide();
        },1000);
    },

    createCardSelectCarousel: function() {
        var store = Ext.getStore('Card');
        var n = store.data.items.length;
        if (n !== 0) {
            // Se selecciona automáticamente la primera tarjeta
            Ext.getCmp('cardHiddenField').setValue(store.data.getAt(0).data.id);
            // Se crean los contenedores con las tarjetas
            for (var i=0;i!=n;i++) {
                var data = store.data.getAt(i).data;
                var html = '<div class="account">'+data.number+'</div>';
                var container = Ext.create('Ext.Container',{
                    html: html,
                    cls: 'accountSelectCarousel'
                });
                Ext.getCmp('cardCarousel').add(container);
            }
        }
    },

    setCard: function(container) {
        var store = Ext.getStore('Card');
        Ext.getCmp('cardHiddenField').setValue(store.data.getAt(container.getActiveIndex()).data.number);
    },

    searchCommerce: function() {
        var me = this;
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Search pay order ...'
        });

        setTimeout(function(){
            Ext.Viewport.setMasked(false);
            var panel = me.getApplication().getController('MainController').getView('payOrder');
            Ext.Viewport.add(panel);
            panel.show();          
        },1000);
    }

});