angular.module("adaptive", ["adaptive.googlemaps","adaptive.vimeo","adaptive.youtube"]);
angular.module('adaptive.googlemaps', [])
.directive('googlemaps', [ function() {
	return {
		restrict: 'E',
		templateUrl: '/template/googlemaps/googlemaps.html',
		scope: {}
	};
}]);
angular.module('adaptive.vimeo', [])
.directive('vimeo', [ function() {
	return {
		restrict: 'E',
		templateUrl: '/template/vimeo/vimeo.html',
		scope: {}
	};
}]);
angular.module('adaptive.youtube', [])
.directive('youtube', [ function() {
	return {
		restrict: 'E',
		templateUrl: '/template/youtube/youtube.html',
		scope: {
			video: "@"
		},
		controller: function($scope, $element) {
			console.log($scope.video);
		}
	};
}]);