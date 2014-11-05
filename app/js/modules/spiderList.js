var spiderListModule = angular.module('spiderListModule', ['spiderDataFactory']);

spiderListModule.directive('spiderList', function(){
        return{
            restrict: 'E',
            templateUrl: 'app/templates/spider-list.html',
            controller: function($scope, $http, dataFormatter){
                var _this = this;
                _this.data = {};
                
                $http.get("spiders.json").success(function(data){
                    _this.data = dataFormatter.formatAllData(data);
                    sd = _this.data;
                }); 

            },
            controllerAs: 'spiderList'
        };
    });
