var spiderDataFactory = angular.module('spiderDataFactory', []);

spiderDataFactory.factory('dataFormatter', function($http){ 

    var f = {};

    f.formatAllData = function(data){

        for (var key in data){
            data[key] = f.formatData(data[key]);
        }

        return data;    
    };

    f.formatData = function(spider){
        //if there's no name, let's identify by size and species
        //this part of fn should move to addSpider form when it eventually gets hooked up
        spider.identification = f.checkIdentifier(spider); 
        
        //get number of weeks since last feeding
        spider.weeksSinceFed = f.checkLastFed(spider.lastFed);

        return spider;
    }

    f.checkIdentifier = function(spider){
        var identification;

        if(!spider.name){
            var inch = " ";
            var size = "unsized";

            if (!isNaN(spider.size)) {
                inch = '" ';
                size = spider.size;
            }

            identification = size + inch
                                + spider.genus + ' '
                                + spider.species;
        }
        else{
            identification = spider.name
        }

        return identification;
    };

    f.checkLastFed = function(lastFed){
        //check spider.lastFed to today's date and return in weeks
 
        var oneDayInMillis = 86400000;
        var oneWeekInMillis = 604800000;
        var dateLastFed = Date.parse(lastFed);
        var diffInMillis = Math.abs(new Date() - dateLastFed);
         
        var numOfWeeks = {};
        
        numOfWeeks.number = Math.round(diffInMillis / oneWeekInMillis);

        numOfWeeks.styleIndicator = numOfWeeks.number >= 4 ? 4 : numOfWeeks.number;

        if (isNaN(numOfWeeks.number)){
            numOfWeeks.number = "";
            numOfWeeks.description = "never";
            numOfWeeks.styleIndicator = 4;
        }

        else {
            if (numOfWeeks.number > 1){
                numOfWeeks.description = "weeks ago";
            }
            else if (numOfWeeks.number == 1){
                numOfWeeks.description = "week ago";
            }
            else if (numOfWeeks.number < 1) {
                var days = Math.round(diffInMillis / oneDayInMillis);
                console.log("days:",days);

                numOfWeeks.number = days;
                numOfWeeks.styleIndicator = 0;
                numOfWeeks.description = "days ago";

                if (days == 0){
                    numOfWeeks.number = "";
                    numOfWeeks.description = "today";
                }
                else if (days == 1){
                   numOfWeeks.description = "day ago"; 
                }
                else if (days > 1) {
                    numOfWeeks.description = "weeks ago";
                }
            }
         }

        return numOfWeeks;
    };

    return f;
});


