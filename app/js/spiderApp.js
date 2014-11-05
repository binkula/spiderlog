(function(){
    var app = angular.module('spiderLog', []);

    var sd;

    app.directive('spiderList', function(){
        return{
            restrict: 'E',
            templateUrl: 'app/templates/spider-list.html',
            controller: function($scope, $http, spiderDataFactory){
                var _this = this;
                _this.data = {};
                
                $http.get("spiders.json").success(function(data){
                    _this.data = spiderDataFactory.formatAllData(data);
                    sd = _this.data;
                }); 

            },
            controllerAs: 'spiderList'
        };
    });
    
    app.directive('spiderProfile', function(){
        return{
            restrict: 'E',
            templateUrl: 'app/templates/spider-profile.html',
            controller: function($scope, spiderDataFactory){
                
                var _this = this;
                _this.data = {};

                var profile = document.getElementsByTagName("spider-profile")[0];
                $scope.spiderProfileForm = {};

                $scope.open = function(id){
                    profile.style.display = "block";

                    S.addClass(profile, "open");
                                        
                    if (id){
                        $scope.spiderProfileForm = sd[id];
                    }
                    console.log(sd[id]);
                }

                $scope.edit = function(id){
                    profile.style.display = "block";

                    S.removeClass(profile, "open");
                    S.addClass(profile, "edit");
                                        
                    if (!id){
                        console.log("hi");
                        $scope.spiderProfileForm = {};
                        $scope.spiderProfileForm.image = "images/default.jpg";
                        console.log(_this.data);
                    }
                }

                $scope.editPhoto = function(id){
                    if (!id){
                        console.log("no id");
                    }
                    else{
                        console.log("edit photo for", id);
                    }
                }

                
                $scope.close = function(){
                    profile.style.display = "none";
                    
                    S.removeClass(profile, "open");
                    S.removeClass(profile, "edit");
                }


                $scope.save = function(id){
                    var spider = {};

                    spider = $scope.spiderProfileForm;

                    if (!id) {
                        //new id - doing this shitty styles for the wireframe
                        id = sd.length;

                        //assuming you didn't feed yet so setting this to blank
                        spider.lastFed = "";

                        //set up the spider object to add to the collection
                        sd[id] = {};
                    }

                    //format the data for the table
                    spider = spiderDataFactory.formatData(spider);
                    
                    sd[id].id = id;
                    sd[id].image = spider.image;
                    sd[id].name = spider.name;
                    sd[id].identification = spider.identification;
                    sd[id].genus = spider.genus;
                    sd[id].species = spider.species;
                    sd[id].size = spider.size;
                    sd[id].weeksSinceFed = spider.weeksSinceFed;

                    $scope.close();
                }

            },

            controllerAs: 'spiderProfile'
        } 
    });



    app.factory('spiderDataFactory', function($http){ 

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
                identification = spider.size + '" '
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
     
            var oneWeekInMillis = 604800000;
            var dateLastFed = Date.parse(lastFed);
            var diffInMillis = Math.abs(new Date() - dateLastFed);
             
            var numOfWeeks = {};
            
            numOfWeeks.number = Math.round(diffInMillis / oneWeekInMillis);

            numOfWeeks.styleIndicator = numOfWeeks.number >= 4 ? 4 : numOfWeeks.number;

            if(!numOfWeeks.number){
                numOfWeeks.number = "";
                numOfWeeks.description = "never";
                numOfWeeks.styleIndicator = 4;
            }
            else if(numOfWeeks.number > 1){
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
        };

        return f;
    });

})();

