/*
 * File: app/view/LoginForm.js
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

Ext.define('Finappsparty.view.LoginForm', {
    extend: 'Ext.form.Panel',
    alias: 'widget.loginFormAlias',

    config: {
        id: 'loginForm',
        itemId: 'loginForm',
        hideOnMaskTap: false,
        url: 'services/login.js',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Shake & Pay'
            },
            {
                xtype: 'fieldset',
                title: 'Username',
                layout: {
                    align: 'center',
                    type: 'vbox'
                },
                items: [
                    {
                        xtype: 'textfield',
                        id: 'usernameField',
                        itemId: 'usernameField',
                        inputCls: 'inputLarge',
                        name: 'username',
                        value: 'vjjordan'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                title: 'Password',
                items: [
                    {
                        xtype: 'passwordfield',
                        id: 'passwordField',
                        itemId: 'passwordField',
                        inputCls: 'inputLarge',
                        name: 'password',
                        value: 'sadiel'
                    }
                ]
            },
            {
                xtype: 'button',
                cls: 'mainButton',
                id: 'loginButton',
                itemId: 'loginButton',
                ui: 'confirm',
                text: 'Login'
            }
        ]
    }

});