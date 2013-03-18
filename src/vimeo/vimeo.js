angular.module('adaptive.vimeo', [])
.directive('vimeo', ['$http', function($http) {
	return {
		restrict: 'E',
		templateUrl: '/template/vimeo/vimeo.html',
		scope: {
			video: "@",
			width: "@",
			height:  "@"
		},
		controller: function($scope, $element) {

			$scope.play = function(){
				$scope.fullvideo = 'http://player.vimeo.com/video/' + $scope.video + '?autoplay=1';
			};

			$scope.$watch('video', function(){
				if (!$scope.video) return false;

				var cb = function(data){
					console.log(data);
				};
				var url = "http://vimeo.com/api/v2/video/" + $scope.video + ".json?callback=JSON_CALLBACK";

				$http.jsonp(url)
				.success(function(data) {
					console.log(data);
					$scope.vimeo = data[0];
					$scope.vimeo.width = $scope.width || $scope.vimeo.width;
					$scope.vimeo.height = $scope.height || $scope.vimeo.height;

					$scope.style = {
						'width': $scope.vimeo.width,
						'height': $scope.vimeo.height
					};
				})
				.error(function(data){
					console.log(data);
				});
			});

		}
	};
}]);