const MODULE_NAME = 'MondayApp.components';

export default MODULE_NAME;

angular.module(MODULE_NAME, [])
    .component('helloWorld', require('../components/MondayApp/appController'));