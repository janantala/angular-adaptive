angular.module('app', ['adaptive']).
config(function($routeProvider) {
	$routeProvider.
	when('/', {controller: AppCtrl, templateUrl: 'view.html'}).
	otherwise({redirectTo:'/'});
});

function AppCtrl($scope) {
	$scope.youtubeId = 'kxopViU98Xo';
	$scope.vimeoId = '57625268';
}