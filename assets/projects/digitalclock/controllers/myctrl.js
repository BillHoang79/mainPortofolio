app.controller('myCtrl', function($scope, $interval) {
    $scope.date = new Date().toLocaleDateString();
    
    $scope.theTime = new Date().toLocaleTimeString();
    $interval(function () {
        $scope.theTime = new Date().toLocaleTimeString();
        $scope.date = new Date().toLocaleDateString();  
    }, 1000);
});

