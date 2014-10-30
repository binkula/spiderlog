(function(){
    var app = angular.module('spiderLog', []);

    app.directive("spiderList", function(){
        return{
            restrict: 'E',
            templateUrl: 'app/templates/spiderList.html',
            controller: function($http){
                this.data = {};

                var spiderData = this;
                
                $http.get("spiders.json").success(function(data){
                    spiderData.data = formatSpiderData(data);
                });

                console.log(this.data);
            },
            controllerAs: 'spiderList'
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

    function formatSpiderData(data){ 
        var spider;

        for (var key in data){
            spider = data[key];

            //if there's no name, let's identify by size and species
            //this part of fn should move to addSpider form when it eventually gets hooked up
            spider.identification = checkIdentifier(data[key]); 
            
            //get number of weeks since last feeding
            spider.weeksSinceFed = checkLastFed(data[key].lastFed);
        }

        console.log(data);
        
        return data;    
    }

    function checkIdentifier(spider){
        var identification;

        if(!spider.name){
            identification = spider.size + '" '
                                + spider.genus + ' '
                                + spider.species;
        }
        else{
            identification = spider.name
        }

        return identification;
    }

    function checkLastFed(lastFed){
        //check spider.lastFed to today's date and return in weeks
 
        var oneWeekInMillis = 604800000;
        var dateLastFed = Date.parse(lastFed);
        var diffInMillis = Math.abs(new Date() - dateLastFed);

        console.log(lastFed, dateLastFed);
         
        var numOfWeeks = {};
        
        numOfWeeks.number = Math.round(diffInMillis / oneWeekInMillis);

        numOfWeeks.styleIndicator = numOfWeeks.number >= 4 ? 4 : numOfWeeks.number;

        if(numOfWeeks.number > 1){
            numOfWeeks.description = "weeks ago";
        }
        else{
            if(numOfWeeks.number < 1) {
                numOfWeeks.number = "< 1"
                numOfWeeks.styleIndicator = 0;
            }

            numOfWeeks.description = "week ago";
        }


        return numOfWeeks;
    }

})();

