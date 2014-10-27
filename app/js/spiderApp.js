(function(){
    var app = angular.module('spiderLog', []);

    app.directive("spiderList", function(){
        return{
            restrict: 'E',
            templateUrl: 'app/templates/spiderTable.html',
            controller: function($http){
                this.data = {};

                var spiderData = this;

                $http.get("spiders.json").success(function(data){
                    console.log(data);
                    spiderData.data = data;
                });
            },
            controllerAs: 'spiders'
        };
    });
    
    app.directive("spiderAdd", function(){
        return{
            restrict: 'E',
            templateUrl: 'app/templates/spiderAdd.html',
            controller: function(){
            
            },
            controllerAs: 'spiderAdd'
        }
    
    });

})();
