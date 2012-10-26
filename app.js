/*
 * File: app.js
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

Ext.Loader.setConfig({
    enabled: true,
    paths: {
        Ext: 'sdk/src'
    }
});

Ext.application({

    requires: [
        'Ext.device.Orientation',
        'Ext.device.Geolocation'
    ],
    models: [
        'Account',
        'User'
    ],
    stores: [
        'Account',
        'User'
    ],
    views: [
        'LoginForm',
        'DirectTransfer',
        'BeneficiaryPanel',
        'PayerPanel'
    ],
    name: 'Finappsparty',
    controllers: [
        'LoginController',
        'MainController',
        'DirectTransferController',
        'BeneficiaryController',
        'PayerController'
    ],

    launch: function() {
        Ext.Viewport.onAfter('activeitemchange', function(layout, newActiveItem, oldActiveItem, eOpts) {
            if (oldActiveItem !== 0) {
                console.log('Se ha eliminado la vista '+oldActiveItem.id);
                Ext.Viewport.remove(oldActiveItem,false);
            }
        });
        Ext.create('Finappsparty.view.LoginForm', {fullscreen: true});
    }

});
