angular.module("adaptive", ["adaptive.googlemaps","adaptive.vimeo","adaptive.youtube"]);
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
angular.module('adaptive.vimeo', [])
.directive('vimeo', ['$http', function($http) {
	return {
		restrict: 'E',
		templateUrl: 'template/vimeo/vimeo.html',
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
(function (YT, Modernizr) {

"use strict";

angular.module('adaptive.youtube', [])
.directive('youtube', ['$timeout', function($timeout) {
	return {
		restrict: 'E',
		templateUrl: 'template/youtube/youtube.html',
		scope: {
			video: "@",
			width: "@",
			height:  "@"
		},
		controller: function($scope, $element) {
			var playing = false;
			$scope.oldiOS = Modernizr.ios && !Modernizr.cssvhunit;

			$scope.play = function(){
				if (playing) {
					return false;
				}
				playing = true;
				$scope.style['background-image'] = "url('data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==')";
				$scope.ytapi = true;

				var player;
				$timeout(function(){
					if (typeof(player) == 'undefined'){
						onYouTubeIframeAPIReady();
					}
				}, 10);

				function onYouTubeIframeAPIReady() {
					console.log('onYouTubeIframeAPIReady');
					player = new YT.Player($element.find('div')[0], {
						height: $scope.height,
						width: $scope.width,
						videoId: $scope.video,
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange
						}
					});
				}

				function onPlayerReady(event) {
					event.target.playVideo();
				}

				function onPlayerStateChange(event) {

				}

				function stopVideo() {
					player.stopVideo();
				}

			};

			$scope.$watch('video', function(){
				if (!$scope.video) return false;

				$scope.youtube = {};
				$scope.youtube.width = $scope.width || 'auto';
				$scope.youtube.height = $scope.height || 'auto';
				$scope.fullvideo = 'http://www.youtube.com/video/' + $scope.video + '?autoplay=1';

				$scope.style = {
					'display': 'block',
					'cursor': 'pointer',
					'background-image': "url('data:image/png;base64,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')",
					'background-repeat': 'no-repeat',
					'background-position': 'center',
					'width': $scope.youtube.width,
					'height': $scope.youtube.height
				};

				$scope.bgstyle = {
					'display': 'block',
					'cursor': 'pointer',
					'background-color': 'rgb(0,0,0)',
					'background-image': "url('http://img.youtube.com/vi/" + $scope.video + "/0.jpg')",
					'background-repeat': 'no-repeat',
					'background-position': 'center',
					'width': $scope.youtube.width,
					'height': $scope.youtube.height
				};

			});

			$element.bind('click', function(event){
				if (!$scope.oldiOS) {
					event.preventDefault();
				}
			});

		}
	};
}]);

})(YT, Modernizr);