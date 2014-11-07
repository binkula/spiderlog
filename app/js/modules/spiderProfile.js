var spiderProfileModule = angular.module('spiderProfileModule', ['spiderDataFactory','angucomplete-alt']);

spiderProfileModule.directive('spiderProfile', function(){
    return{
        restrict: 'E',
        templateUrl: 'app/templates/spider-profile.html',
        controller: function($scope, $http, dataFormatter){
            
            var _this = this;
            _this.data = {};

            $scope.profileShow = false;
            $scope.profileClass = "";

            $scope.spiderProfileForm = {};

            $scope.open = function(id){
                $scope.profileShow = true;
                $scope.profileClass = "open";

                if (!isNaN(id)) {
                    $scope.spiderProfileForm = sd[id];
                    console.log(sd);
                }
            }

            $scope.edit = function(id){
                var _scope = $scope;
                _scope.speciesList = [];                

                $scope.profileShow = true;
                $scope.profileClass = "edit";

                var gInput = document.getElementById("spider-genus_value");
                var sInput = document.getElementById("spider-species_value");
                var gValue = "";
                var sValue = "";

                $http.get("app/js/json/species.json").success(function(data){
                    _scope.speciesList = data;
                }); 

                if (isNaN(id)) {
                    $scope.spiderProfileForm = {};
                    $scope.spiderProfileForm.image = "images/default.jpg";
                }
                else{
                    gValue = sd[id].genus;
                    sValue = sd[id].species;
                }

                $scope.selectedGenus = {
                    "title": gValue                   
                };

                gInput.value = gValue;
                sInput.value = sValue;
            }


            $scope.editPhoto = function(id){
                if (isNaN(id)){
                    console.log("no id");
                }
                else{
                    console.log("edit photo for", id);
                }
            }

            
            $scope.close = function(){
                $scope.profileShow = false;
                $scope.profileClass = "";
            }


            $scope.save = function(id){
                var spider = {};

                spider = $scope.spiderProfileForm;

                var gInput = document.getElementById("spider-genus_value");
                var sInput = document.getElementById("spider-species_value");
                
                if (gInput.value != "") { 
                    spider.genus = gInput.value;
                }
                else{spider.genus = "unknown"}

                if (sInput.value != "") {
                    spider.species = sInput.value;
                }
                else{
                    spider.species = "species";
                }

                if (isNaN(id)) {
                    //new id - doing this shitty styles for the wireframe
                    id = sd.length;

                    //assuming you didn't feed yet so setting this to blank
                    spider.lastFed = "";

                    //set up the spider object to add to the collection
                    sd[id] = {};
                }

                //format the data for the table
                spider = dataFormatter.formatData(spider);
console.log(spider);

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

