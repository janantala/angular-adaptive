angular.module("adaptive", ["adaptive.tpls", "adaptive.youtube"]);
angular.module("adaptive.tpls", ["template/youtube/youtube.html"]);
angular.module('adaptive.youtube', [])
.directive('youtube', [ function() {
	return {
		restrict: 'E',
		templateUrl: '/template/youtube/youtube.html',
		scope: {}
	};
}]);