/*
 * File: app/controller/DirectTransferController.js
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

Ext.define('Finappsparty.controller.DirectTransferController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            logoutButton: '#logoutButton',
            searchTransferButton: '#searchTransferButton'
        },

        control: {
            "#directTransfer": {
                initialize: 'onDirectTransferInitialize'
            },
            "#accountCarousel": {
                activeitemchange: 'onAccountCarouselActiveItemChange'
            },
            "searchTransferButton": {
                tap: 'onSearchTransferTap'
            },
            "logoutButton": {
                tap: 'onLogoutButtonTap'
            }
        }
    },

    onDirectTransferInitialize: function(component, options) {
        this.initView();
    },

    onAccountCarouselActiveItemChange: function(container, value, oldValue, options) {
        this.setAccount(container);
    },

    onSearchTransferTap: function(button, e, options) {
        this.searchTransfer();
    },

    onLogoutButtonTap: function(button, e, options) {
        this.getApplication().getController('LoginController').showLogin();
    },

    createAccountSelectCarousel: function() {
        var store = Ext.getStore('Account');
        var n = store.data.items.length;
        if (n !== 0) {
            // Se selecciona automáticamente la primera cuenta
            Ext.getCmp('accountIdField').setValue(store.data.getAt(0).data.id);
            // Se crean los contenedores con los números de cuenta
            for (var i=0;i!=n;i++) {
                var data = store.data.getAt(i).data;
                var cls = 'positive';
                if (data.balance < 0) {
                    cls = 'negative';
                }
                var html = '<div class="account">'+data.accountNumber+'</div><div class="balance '+cls+'">'+data.actualBalance+' €</div>';
                var container = Ext.create('Ext.Container',{
                    html: html,
                    cls: 'accountSelectCarousel'
                });
                Ext.getCmp('accountCarousel').add(container);
            }
        }
    },

    searchTransfer: function() {
        var me = this;
        /*
        Ext.Viewport.setMasked({
        xtype: 'loadmask',
        message: ''
        });
        */

        /*
        Ext.device.Geolocation.getCurrentPosition({
        success: function(position) {
        console.log(position.coords);
        send(position);
        },
        failure: function() {
        console.log('something went wrong!');
        send();
        }
        });

        var send = function(position) {
        var lat = 0;
        var lon = 0;
        if (position !== null) {
        lat = position.coords.latitude;
        lon = position.coords.longitude;
        }
        Ext.getCmp('latField').setValue(lat);
        Ext.getCmp('lonField').setValue(lon);
        //Ext.Viewport.setMasked(false);
        if (me.isPayer()) {
            me.searchBeneficiary();
        } else {
            me.searchPayer();    
        }
    };

    */

    Ext.getCmp('latField').setValue(0);
    Ext.getCmp('lonField').setValue(0);

    if (me.isPayer()) {
        me.searchBeneficiary();
    } else {
        me.searchPayer();    
    }

    },

    isPayer: function() {
        return (Ext.getCmp('amountField').getValue() !== null);
    },

    responseSearchBeneficiary: function(result, panel) {
        var payerAccount = Ext.getCmp('accountHiddenField').getValue();
        var amount = Ext.getCmp('amountField').getValue();
        var data = result.data;
        data.payerAccount = payerAccount;
        data.amount = amount;
        panel.updateData(data);
        Ext.Viewport.add(panel);
        panel.show();
    },

    responseSearchPayer: function(result, panel) {
        var beneficiaryAccount = Ext.getCmp('accountHiddenField').getValue();
        var data = result.data;
        data.beneficiaryAccount = beneficiaryAccount;
        panel.updateData(data);
        Ext.Viewport.add(panel);
        panel.show();
    },

    searchBeneficiary: function() {
        if (this.validateTransfer()) {
            var me = this;

            //var urlService = 'services/searchBeneficiary.js';
            var urlService = 'http://ppcjparis:8080/services/send';
            var panel = this.getApplication().getController('MainController').getView('payerPanel');

            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Buscando<br/>beneficiario ...'
            });    

            Ext.getCmp('directTransfer').submit({
                url: urlService,
                success: function(form, result) {
                    me.responseSearchBeneficiary(result, panel);
                    Ext.Viewport.setMasked(false);
                },
                failure: function(form, result) {
                    Ext.Viewport.setMasked(false);
                    Ext.Msg.alert('Aviso', 'No se ha podido realizar la petición, por favor, vuelva a intentarlo');
                }
            });
        } else {
            Ext.Msg.alert('Aviso', 'No dispone de saldo suficiente para realizar la transferencia');
        }
    },

    searchPayer: function() {
        var me = this;

        var urlService = 'http://ppcjparis:8080/services/recieve';
        var panel = this.getApplication().getController('MainController').getView('beneficiaryPanel');

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Buscando<br/>ordenante ...'
        });

        Ext.getCmp('directTransfer').submit({
            url: urlService,
            success: function(form, result) {
                me.responseSearchPayer(result, panel);
                Ext.Viewport.setMasked(false);
            },
            failure: function(form, result) {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Aviso', 'No se ha podido realizar la petición, por favor, vuelva a intentarlo');
            }
        });
    },

    validateTransfer: function() {
        var store = Ext.getStore('Account');
        var accountCarousel = Ext.getCmp('accountCarousel');
        var balance = store.data.getAt(accountCarousel.getActiveIndex()).data.balance;
        var amount = Ext.getCmp('amountField').getValue();
        return balance > amount;

    },

    setAccount: function(container) {
        var store = Ext.getStore('Account');
        Ext.getCmp('accountHiddenField').setValue(store.data.getAt(container.getActiveIndex()).data.number);
    },

    initView: function() {
        var userData = Ext.getStore('User').getData().getAt(0).data;
        Ext.getCmp('userIdField').setValue(userData.id);
        Ext.getCmp('userNameField').setValue(userData.name);
        Ext.getCmp('userLastnameField').setValue(userData.lastname);
        this.createAccountSelectCarousel();
    }

});