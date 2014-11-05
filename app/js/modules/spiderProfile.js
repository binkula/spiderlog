var spiderProfileModule = angular.module('spiderProfileModule', ['spiderDataFactory']);

spiderProfileModule.directive('spiderProfile', function(){
        return{
            restrict: 'E',
            templateUrl: 'app/templates/spider-profile.html',
            controller: function($scope, dataFormatter){
                
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
                    spider = dataFormatter.formatData(spider);
                    
                    sd[id].id = id;
                    sd[id].image = spider.image;
                    sd[id].name = spider.name;
                    sd[id].identification = spider.identification;
                    sd[id].genus = spider.genus;
                    sd[id].species = spider.species;
                    sd[id].size = spider.size;
                    sd[id].weeksSinceFed = spider.weeksSinceFed;
console.log(sd);

                    $scope.close();
                }

            },

            controllerAs: 'spiderProfile'
        } 
    });

