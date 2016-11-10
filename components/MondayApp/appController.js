function appController($scope, $state, Data, $http, $filter) {
    'ngInject';


    $scope.active = 0;
    $scope.format = 'dd-MMMM-yyyy';

    //for tabs of steps
    $scope.tabs = [
        {name: "STEP 1", action: ".tab1", active: true, disabled: false, class: "pointer-active"},
        {name: "STEP 2", action: ".tab2", active: false, disabled: true, class: "not-active"},
        {name: "STEP 3", action: ".tab3", active: false, disabled: true, class: "not-active"}
    ];
// to enable the tabs
    function enableTab(index, value) {
        $scope.tabs[index].disabled = value;
        $scope.tabs[index].class = (value) ? "not-active" : "pointer-active";
    }

    //get the data from factory data
    $scope.data = Data;
    
    //navigation from one tab to other
    $scope.next = function (index) {
        if (index == 2) {
            console.log(index, 'click');
            enableTab(0, true);
            enableTab(1, true);
            $scope.done = true;
        }
        if ($scope.data.ReturnDt < $scope.data.DepartureDt) {
            $scope.returnInvalid = true;
            console.log('return', $scope.returnInvalid);
        }
        $scope.active = index;
        $state.go('tab.tab' + parseInt(index + 1));
        enableTab(index, false);
        angular.element('#body').css({'background-image': 'url( /assets/slide' + parseInt(index + 1) + '.jpg'});
    };

    //navigate from home to main page
    $scope.onButtonClick = function () {
        $state.go('tab.tab1');
        $scope.tabs[0].class = "pointer-active";
        angular.element('#body').css({'background-image': 'url( /assets/1234.jpg'});
    };

    //validation of datepicker
    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
    };
    //open datepicker of departure date
    $scope.open1 = function () {
        $scope.popup1.opened = true;
    };
    //open datepicker of return date
    $scope.open2 = function () {
        $scope.popup2.opened = true;
    };
    $scope.popup1 = {opened: false};
    $scope.popup2 = {opened: false};

    // data for ui-select for loacations
    $scope.country = {};
    $scope.country.selected = undefined;
    $scope.countries = [{city: 'Pune', country: 'India ', state: 'Maharashtra'},
        {city: 'Mumbai', country: 'India ', state: 'Maharashtra'},
        {city: 'Ahmednagar', country: 'India ', state: 'Kerela'},
        {city: 'Satara', country: 'India ', state: 'Kerela'},
        {city: 'Boston', country: 'United States', state: 'Washington'},
        {city: 'New York', country: 'United States', state: '	California'},
        {city: 'Chicago', country: 'United States', state: '	California'},
        {city: 'San Francisco', country: 'United States', state: 'Washington'},
    ];


    // generate message for mail
    $scope.mailMessage = function (name, city, date) {
        var filterdate = $filter('date')(date, "dd MMMM yyyy");
        var message = 'Hello ' + name + ',';
        message += ' We are very happy to inform you that your ticket of ' + city + ' is confirm on' +
            filterdate + '.';
        message += '\n Thank You';
        message += ' \n Regards';
        message += '\n Dreamy Destination';
        return message;
    };

    //send mail
    $scope.send = function (email, mail) {
        $scope.loading = true;
        $http.post('http://192.168.10.63:8080/sendmail', {
            from: 'rizwana411@gmail.com',
            to: email,
            subject: 'Dream Destinations ',
            text: mail
        }).then(res=> {
            $scope.done = true;
            $scope.serverMessage = 'Email sent successfully';
        });
    }
}
module.exports = /*@ngInject*/ appController;
