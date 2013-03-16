angular.module("adaptive", ["adaptive.tpls", "adaptive.googlemaps","adaptive.vimeo","adaptive.youtube"]);
angular.module("adaptive.tpls", ["template/googlemaps/googlemaps.html","template/vimeo/vimeo.html","template/youtube/youtube.html"]);
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
		scope: {}
	};
}]);