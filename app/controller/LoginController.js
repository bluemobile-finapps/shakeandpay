/*
 * File: app/controller/LoginController.js
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

Ext.define('Finappsparty.controller.LoginController', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            loginButton: '#loginButton'
        },

        control: {
            "loginButton": {
                tap: 'onLoginButtonTap'
            }
        }
    },

    onLoginButtonTap: function(button, e, options) {
        this.loginAction();
    },

    showLogin: function() {
        this.getApplication().getController('MainController').changeView('loginForm');
        Ext.getStore('User').removeAll();
        Ext.getStore('Account').removeAll();
    },

    hideLogin: function() {
        this.getApplication().getController('MainController').changeView('directTransfer');
    },

    loginAction: function() {
        var me = this;

        var accountRequest;
        var cardRequest;

        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Loading ...'
        });

        Ext.Ajax.request({
            url: me.getApplication().getController('UrlController').getLoginUrl(),
            method: 'GET',
            success: function(response) {
                var data = Ext.JSON.decode(response.responseText);
                if (data.status === 'OK') {
                    saveUserData(data.token);
                } else {
                    error();
                }
            },

            failure: function(response) {
                error();
            }
        });

        var error = function() {
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert('Warning', 'No se ha podido acceder, por favor, compruebe las credenciales');
        };

        var saveUserData = function(token) {
            Ext.Ajax.request({
                url: me.getApplication().getController('UrlController').getProfileUrl(token),
                method: 'GET',
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    // Save user data
                    var userData = {
                        username: data.data.holder.username,
                        password: data.data.holder.password,
                        firstName: data.data.holder.firstName,
                        lastName: data.data.holder.lastName,
                        token: token
                    };
                    me.resetStore();
                    Ext.getStore('User').setData(userData);
                    // Save user account data
                    var accounts = data.data.accounts;
                    accountRequest = accounts.length;
                    for (var i=0;i!=accounts.length;i++) {
                        saveAccountData(token,accounts[i]);                  
                    }
                    // Save user cards data
                    var cards = data.data.cards;
                    cardRequest = cards.length;
                    for (var j=0;j!=cards.length;j++) {
                        saveCardsData(token,cards[j]);               
                    }
                },
                failure: function(response) {
                    error();
                }
            });
        };  

        var saveAccountData = function(token, idAccount) {
            Ext.Ajax.request({
                url: me.getApplication().getController('UrlController').getAccountUrl(token,idAccount),
                method: 'GET',
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    Ext.getStore('Account').add(data.data);
                    accountRequest--;
                    if (accountRequest === 0) {
                        me.hideLogin();
                        Ext.Viewport.setMasked(false);
                    }
                },
                failure: function(response) {
                    error();
                }
            }); 
        };

        var saveCardData = function(token, idCard) {
            Ext.Ajax.request({
                url: me.getApplication().getController('UrlController').getCardUrl(token,idCard),
                method: 'GET',
                success: function(response) {
                    var data = Ext.JSON.decode(response.responseText);
                    Ext.getStore('Card').add(data.data);
                    cardRequest--;
                    if (cardRequest === 0) {
                        me.hideLogin();
                        Ext.Viewport.setMasked(false);
                    }
                },
                failure: function(response) {
                    error();
                }
            }); 
        };
    },

    resetStore: function() {
        var userStore = Ext.getStore('User');
        userStore.removeAll();
        userStore.remove(userStore.getRange());
        var accountStore = Ext.getStore('Account');
        accountStore.removeAll();
        accountStore.remove(accountStore.getRange());
        var cardStore = Ext.getStore('Account');
        cardStore.removeAll();
        cardStore.remove(cardStore.getRange());
    }

});