(function(){
    var app = angular.module('spiderLog', []);
  
    app.controller("SpiderController", ['$http', function($http){
        this.name = "";
        this.size = "";
        this.got = "";
        this.lastFed = "";
        this.lastMolt = "";

        var spider = this;

        $http.get("spiders.json").success(function(data){
            console.log(data);
            spider.name = data.name;
            spider.size = data.size;
            spider.got = data.got;
            spider.lastFed = data.lastFed;
            spider.lastMolt = data.lastMolt;
        });
    } ]);

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
})();
