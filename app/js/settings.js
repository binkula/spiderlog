(function(){
    var settings = angular.module('settings', []);

    settings.directive("settings", function(){
        return{
            restrict: 'E',
            templateUrl: 'app/templates/settings.html',
            controller: function($http){
            },
            controllerAs: 'settings'
        };
    });
})();
