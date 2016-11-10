/*
var nodeMailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
*/

var travelApp = angular.module('traveller', [
        'ngSanitize',
        'ui.router', 'ui.select',
        'ui.bootstrap','validation', 'validation.rule',
        require('../compositions/DDmodule.js')
    ])
    .config(require('../routes/routes'))
    .constant('appName', 'traveller')
    .run(['$state', function ($state) {
        $state.go('home');
    }]);

travelApp.factory('Data', function () {
    return {
        FirstName: '',
        LastName: '',
        Email: '',
        Contact: '',
        Location: '',
        radioModel: 'OneWay',
        DepartureDt: '',
        ReturnDt: ''
    };
});
