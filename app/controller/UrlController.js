/*
 * File: app/controller/UrlController.js
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

Ext.define('Finappsparty.controller.UrlController', {
    extend: 'Ext.app.Controller',

    config: {
    },

    getLoginUrl: function() {
        var username = Ext.getCmp('usernameField').getValue();
        var password = Ext.getCmp('passwordField').getValue();
        var loginUrl = 'http://'+username+':'+password+'@'+this.getBaseUrl(true)+'access/login';
        return loginUrl;
    },

    getBaseUrl: function(login) {
        var baseUrl = 'finappsapi.bdigital.org/api/2012/598de93a7f/';
        if (login !== undefined && login === true) {
            return baseUrl;
        }
        return 'http://'+baseUrl;

    },

    getProfileUrl: function(token) {
        return this.getBaseUrl()+token+'/operations/client/profile/@me';
    },

    getAccountUrl: function(token, idAccount) {
        return this.getBaseUrl()+token+'/operations/account/'+idAccount;
    },

    getTransferUrl: function() {
        return this.getBaseUrl()+token+'/operations/account/tranfer/';
    },

    getSearchPayeeUrl: function() {

    },

    getBaseUrlServices: function() {
        return 'http://172.20.45.59:8080/services/';
    }

});