(function (Modernizr, google) {

	"use strict";

var loadMap = function($element, center, zoom) {
	var mapOptions = {
		center: new google.maps.LatLng(0, 0),
		zoom: (Number(zoom) || 8),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map($element[0], mapOptions);

	var geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': center}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var marker = new google.maps.Marker({
				map: map,
				position: results[0].geometry.location
			});
		} else {
			console.error('Geocode was not successful for the following reason: ' + status);
		}
	});

};



angular.module('adaptive.googlemaps', [])
.directive('googlemaps', [ function() {
	return {
		restrict: 'E',
		templateUrl: 'template/googlemaps/googlemaps.html',
		scope: {
			center: "@",
			zoom: "@",
			width: "@",
			height:  "@"
		},
		link: function postLink($scope, $element, $attr) {
			$scope.maps = {};
			$scope.maps.width = $attr.width + 'px';
			$scope.maps.height = $attr.height + 'px';
			$scope.style = {
				'display': 'block',
				'cursor': 'pointer',
				'width': $scope.maps.width,
				'height': $scope.maps.height
			};
			$scope.$watch('center', function(){
				if (!$scope.center) return false;
				$scope.mapurl = "http://maps.apple.com/?q=" + $scope.center + "&z=" + $scope.zoom;
				$scope.imgurl = "http://maps.googleapis.com/maps/api/staticmap?center=" + $scope.center + "&zoom=" + $scope.zoom + "&size=" + $scope.width + "x" + $scope.height + "&sensor=false";
			});

			var loaded = false;
			$element.bind('click', function(event){
				if (!Modernizr.ios && !loaded) {
					event.preventDefault();
					loaded = true;
					loadMap($element.find('a'), $scope.center, $scope.zoom);
				}
				else if (!Modernizr.ios && loaded) {
					event.preventDefault();
				}
			});
		}
	};
}]);

}(Modernizr, google));