(function() {
    var videoApp = angular.module('videoApp', []);
    videoApp.controller('videoCtrl', function($scope, $http) {
        $scope.videos = []
        $http.get('source1.json').success(function(data) {
            for (var i = 0; i < data.length; i++)
                $scope.videos.push(data[i]);
        });
        $http.get('source2.json').success(function(data) {
            for (var i = 0; i < data.length; i++)
                $scope.videos.push(data[i]);
        });
        $scope.orderByMe = function(video) {
            $scope.myOrderBy = video;
        }
    });

    var header = document.getElementById("myDIV");
    var btns = header.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
            var current = document.getElementsByClassName("active");
            current[0].className = current[0].className.replace(" active", "");
            this.className += " active";
        });
    }
})();