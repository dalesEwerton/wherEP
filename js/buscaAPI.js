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
					id: serieAPI.imdbID,
					userRate: "N/A",
					lastEp: "N/A"
				} 
			});

			result.resolve(list);
		}, function() {
			result.reject();
		});

		return result.promise;

	}

	service.SearchDetails = function(id) {

		var result = $q.defer();

		var urlAPI = "http://www.omdbapi.com/?apikey=93330d3c&i=" + id;

		$http.get(urlAPI).then(function(responce) {
			
			var list = {
					title: responce.data.Title,
					urlCover: responce.data.Poster,
					sinopse: responce.data.Plot,
					rated: responce.data.Rated,
					rating: responce.data.imdbRating,
					genre: responce.data.Genre,
					totalSeasons: responce.data.totalSeasons,
					id: responce.data.imdbID,
					year: responce.data.Year
				}

			result.resolve(list);
		}, function() {
			result.reject();
		});

		return result.promise
	}

});


seriesAPI.controller("UserController", function(SearchAPI) {

	var controller = this;
	controller.title = "Search for...";
	controller.textSearch = null;
	

	controller.Search = function() {
		SearchAPI.Search(controller.textSearch).then(function(list) {
			controller.list = list; 
			controller.detailSerie = null;
		}) 
	}

	var profile = [];


	controller.addToProfile = function(id) {

		SearchAPI.SearchDetails(id).then(function(sDetail) {
			profile.push(sDetail);
		})
		
		controller.list = []
		
	}


	controller.returnProfile = function() {
		return profile;
	}

	controller.removeFromProfile = function(id) {
		var conf = confirm("Do you really want to remove the serie from profile?");
		console.log(id);

		if(conf) {
			for (var i = profile.length - 1; i >= 0; i--) {
				console.log(profile[i]);
				if (profile[i].id == id) {
					profile.splice(i, 1);
				}
			};
		}
	}

	var watchlist = [];

	controller.addToWatchlist = function(serie) {
		watchlist.push(angular.copy(serie));
		console.log(watchlist);
	}

	
	controller.openModal = function () {

		var modal = document.getElementById("myModal");

		var btn = document.getElementById("DetailButton");

		var span = document.getElementsByClassName("close")[0];

		btn.onclick = function() {
		    modal.style.display = "block";
		}

	
		span.onclick = function() {
		    modal.style.display = "none";
		}

		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
	}	

})