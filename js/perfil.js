seriesAPI.module("SeriesApi").controller("ProfileController", function ($scope) {
	
	$scope.app = "Perfil";

	$scope.series = [];

	$scope.addSerie = function(serie) {

			$scope.series.push(angular.copy(serie));
			console.log(series);
			delete $scope.serie;
	}


})