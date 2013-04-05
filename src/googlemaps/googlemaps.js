(function () {

	"use strict";

var initialize = function() {
	console.log('iii');
	var mapOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
};



angular.module('adaptive.googlemaps', [])
.directive('googlemaps', [ function() {
	return {
		restrict: 'E',
		templateUrl: 'template/googlemaps/googlemaps.html',
		scope: {
			video: "@",
			width: "@",
			height:  "@"
		},
		controller: function($scope, $element) {
			console.log('aaa');
			$scope.$watch('height', function(){
				// if (!$scope.height) return false;
				// google.maps.event.addDomListener(window, 'load', initialize);
				initialize();
			});
		}
	};
}]);

}());