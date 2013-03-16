angular.module('adaptive.vimeo', [])
.directive('vimeo', [ function() {
	return {
		restrict: 'E',
		templateUrl: '/template/vimeo/vimeo.html',
		scope: {}
	};
}]);