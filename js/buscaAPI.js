var seriesAPI = angular.module("SeriesApi", []);

seriesAPI.service("SearchAPI", function($http, $q) {
	var service = this;

	service.Search = function(sName) {
		var result = $q.defer();

		var urlAPI = "https://omdbapi.com/?apikey=93330d3c&type=series&s=" + sName;


		$http.get(urlAPI).then(function(responce) {
			var list = responce.data.Search.map(function(serieAPI) {
				return {
					title: serieAPI.Title,
					urlCover: serieAPI.Poster,
					year: serieAPI.Year,
					id: seriesAPI.imdbID
				} 
			});

			result.resolve(list);
		}, function() {
			result.reject();
		});

		return result.promise;

	}
});


seriesAPI.controller("UserController", function(SearchAPI) {

	var controller = this;
	controller.title = "Search for...";
	controller.textSearch = null;
	

	controller.Search = function() {
		SearchAPI.Search(controller.textSearch).then(function(list) {
			controller.list = list;
			console.log(list); 
		}) 
	}

	var profile = [];


	controller.addToProfile = function(serie) {

		var add = true;
		
		if(profile.includes(serie) == false) {
			profile.push(angular.copy(serie));
			console.log(profile);
			controller.list = []
		}
	}


	controller.returnProfile = function() {
		return profile;
	}

	var watchlist = [];

	controller.addToWatchlist = function(serie) {
		watchlist.push(angular.copy(serie));
		console.log(watchlist);
	}

	

})




