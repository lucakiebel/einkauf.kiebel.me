var einkaufsListe = angular.module('Einkaufliste', []);

function mainController($scope, $http) {
    $scope.formData = {};
    $http.get('/api/items')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.createTodo = function() {
		if ($scope.formData != null){
			$http.post('/api/items', $scope.formData)
	            .success(function(data) {
	                $scope.formData = {};
	                $scope.todos = data;
	                console.log(data);
	            })
	            .error(function(data) {
	                console.log('Error: ' + data);
	            });
		}
        else {
        	$scope.formData = {};
        }
    };
    $scope.deleteTodo = function(id) {
        $http.delete('/api/items/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}
