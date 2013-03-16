angular.module('adaptive.youtube', [])
.directive('youtube', [ function() {
	return {
		restrict: 'E',
		templateUrl: '/template/youtube/youtube.html',
		scope: {
			video: "@"
		},
		controller: function($scope, $element) {

		}
	};
}]);