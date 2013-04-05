(function (YT) {

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

			$scope.play = function(){
				// $scope.fullvideo = 'http://www.youtube.com/embed/' + $scope.video + '?autoplay=1';
				$scope.ytapi = true;

				var player;
				$timeout(function(){
					if (typeof(player) == 'undefined'){
						onYouTubeIframeAPIReady();
					}
				}, 3000);

				function onYouTubeIframeAPIReady() {
					console.log('onYouTubeIframeAPIReady');

					player = new YT.Player('player', {
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

				$scope.style = {
					'width': $scope.youtube.width,
					'height': $scope.youtube.height
				};

			});


		}
	};
}]);

})(YT);