angular.module('adaptive.youtube', [])
.directive('youtube', [ function() {
	return {
		restrict: 'E',
		templateUrl: '/template/youtube/youtube.html',
		scope: {
			video: "@"
		},
		controller: function($scope, $element) {

			$scope.play = function(){
				$scope.fullvideo = 'http://www.youtube.com/embed/' + $scope.video + '?autoplay=1';
			};
		}
	};
}]);