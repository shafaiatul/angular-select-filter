angular.module("SelectFilter", [ "kendo.directives", "checklist-model" ])
      .controller("MyCtrl", function($http, $scope){
        $scope.itemChosen = false;
        $scope.selectedItem = "";
    
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
        
        
        // logs the kendo event object
        $scope.change = function(e) {
            
            $scope.itemChosen = true;
            console.log($scope.itemChosen);
            if(e.sender.text() === 'Select...'){
                $scope.itemChosen = false;
                console.log($scope.itemChosen)
            }
            
            
        }
           
})
