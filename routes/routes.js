export default function ($stateProvider, $urlRouterProvider) {
    'ngInject';

    require('../components/MondayApp/index.scss');
    var Controller = require('../components/MondayApp/appController');
  /*  var json = require("json!../components/MondayApp/config.json");
    console.log(json);
*/
    $urlRouterProvider.otherwise('/home');


    $stateProvider
        .state('tab', {
            url: '/tab',
            templateUrl: '../components/MondayApp/main.html',
            controller: Controller
        })
        .state('tab.tab1', {
            url: '/tab1',
            templateUrl: '../components/MondayApp/Step1.html'
        })
        .state('tab.tab2', {
            url: '/tab2',
            templateUrl: '../components/MondayApp/Step2.html'
        })
        .state('tab.tab3', {
            url: '/tab3',
            templateUrl: '../components/MondayApp/Step3.html'
        })
        .state('home', {
            url: '/home',
            templateUrl: '../components/MondayApp/home.html',
            controller: Controller

        });

}
