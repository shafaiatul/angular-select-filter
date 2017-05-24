angular.module("SelectFilter", [ "kendo.directives", "checklist-model" ])
      .controller("MyCtrl", function($http, $scope){

        $scope.itemChosen = false;
        $scope.selectedItem = "";
        $scope.checkedItem = {
            selectedItem: {
                categories: []
            }
        }
        $scope.checkedItem = {
            selectedItem: {
                expertises: []             
            }
        }
        
    
        // Getting all the data from the background.json file
        //-----------------------------------------------------
        $http.get('data/jobs.json').then(function(response) {
            $scope.jobs = response.data;

            $scope.selectOptions = {
                dataSource: {
                    data: $scope.jobs
                },
                dataTextField:"name",
                dataValueField:"id",
                optionLabel: "Select..."
            }
            
        });

        // Mapping background.json data with the data from detail.json
        //--------------------------------------------------------------        
        function getDetail() {
            $http.get('data/detail.json').then(function(response) {
                $scope.details = response.data;
            
                $scope.details.forEach(function(jobDetail) {
                    //console.log(jobDetail.name);
                    
                        //console.log(job.name);
                        if(jobDetail.id === $scope.selectedItem.id) {
             
                            $scope.selectedItem.expertises = jobDetail.expertises;
                            console.log($scope.selectedItem.expertises);
                            $scope.selectedItem.expertises.forEach(function(eachExpertise) {
                                console.log(eachExpertise.field);
                            });
                        }
                    
                
                });
            });
        } 
         
        
        
        // Selecting a Item from Dropdownlist
        //-------------------------------------
        $scope.change = function(e) {
            $scope.checkedItem.selectedItem.categories = [];
            $scope.checkedItem.selectedItem.expertises = [];
            $scope.finalInfo = {};
            
            $scope.itemChosen = true;
            console.log($scope.itemChosen);
            if(e.sender.text() === 'Select...'){
                $scope.itemChosen = false;
                console.log($scope.itemChosen)
            } 
            getDetail();
            

        }

           
        // Check All and UnChcek All button for Categories
        //------------------------------------------------
        $scope.checkAllCategories = function() {
            $scope.checkedItem.selectedItem.categories = angular.copy($scope.selectedItem.categories);
        };
        $scope.uncheckAllCategories = function() {
            $scope.checkedItem.selectedItem.categories = [];
        };

        // Check All and UnChcek All button for Expertises
        //------------------------------------------------
        $scope.checkAllExpertise = function() {
            $scope.checkedItem.selectedItem.expertises = angular.copy($scope.selectedItem.expertises);
        };
        $scope.uncheckAllExpertise = function() {
            $scope.checkedItem.selectedItem.expertises = [];
        };
           
        
        // Send the checked items under a selected item 
        //----------------------------------------------
        $scope.checkedItemSend = function() {
            $scope.finalInfo = {
                Id: $scope.selectedItem.id,
                Name: $scope.selectedItem.name,
                ChosenCategories: $scope.checkedItem.selectedItem.categories,
                ChosenExpertises: $scope.checkedItem.selectedItem.expertises
            }
        }
})