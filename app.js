angular.module("SelectFilter", [ "kendo.directives", "checklist-model" ])
      .controller("MyCtrl", function($http, $scope){

        $scope.itemChosen = false;
        $scope.selectedItem = "";
        $scope.checkedItem = {
            selectedItem: {
                categories: []
            }
        }
        
    
        // Getting all the data from the JSON file
        $http.get('data.json').then(function(response) {
            $scope.jobs = response.data;

            $scope.selectOptions = {
                dataSource: {
                    data: $scope.jobs
                },
                dataTextField:"name",
                dataValueField:"id",
                optionLabel: "Select..."
            }
            
        })
        
        
        // Selecting a Item from Dropdownlist
        $scope.change = function(e) {
            $scope.checkedItem.selectedItem.categories = [];
            $scope.finalInfo = {};
            
            $scope.itemChosen = true;
            console.log($scope.itemChosen);
            if(e.sender.text() === 'Select...'){
                $scope.itemChosen = false;
                console.log($scope.itemChosen)
            }         
        }

           
        // Check All and UnChcek All button
        $scope.checkAll = function() {
            $scope.checkedItem.selectedItem.categories = $scope.selectedItem.categories.map(function(item) { return item.id; });
        };
        $scope.uncheckAll = function() {
            $scope.checkedItem.selectedItem.categories = [];
        };
           
        
        // Send the checked items under a selected item 
        $scope.checkedItemSend = function() {
            $scope.finalInfo = {
                id: $scope.selectedItem.id,
                name: $scope.selectedItem.name,
                chosenCategories: $scope.checkedItem.selectedItem.categories
            }
        }
})
