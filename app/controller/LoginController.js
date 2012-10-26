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
    },

    hideLogin: function() {
        this.getApplication().getController('MainController').changeView('directTransfer');
    },

    loginAction: function() {
        var me = this;
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: 'Validando<br/>credenciales ...'
        });
        Ext.getCmp('loginForm').submit({
            success: function(form, result) {
                Ext.getStore('User').setData(result.user);
                Ext.getStore('Account').setData(result.accounts);
                me.hideLogin();
                Ext.Viewport.setMasked(false);
            },
            failure: function(form, result) {
                Ext.Viewport.setMasked(false);
                Ext.Msg.alert('Aviso', 'No se ha podido acceder, por favor, compruebe las credenciales');
            }
        });
    }

});