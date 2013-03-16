angular.module('adaptive.googlemaps', [])
.directive('googlemaps', [ function() {
	return {
		restrict: 'E',
		templateUrl: '/template/googlemaps/googlemaps.html',
		scope: {}
	};
}]);