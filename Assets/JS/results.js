var movieApiKey = "k_ctt698mf";

var getMovies = function(movieName) {
    var movieApiUrl = "https://imdb-api.com/en/API/SearchMovie/" + movieApiKey + "/" + movieName;


    fetch(movieApiUrl)
      .then(function(response) {
        if (response.ok) {
          return response.json()
        } else {
          alert("Error: " + response.statusText);
        } 
      })
      .then(function(data){
        console.log(data);
        // displayMovieSearch(data); -- to be added later
        
        let movieData = {
            title: data.results[0].title,
            poster: data.results[0].image,
            descrip: data.results[0].description,
        };
        console.log(movieData);
        
      })
      .catch(function(error){
          alert("Unable to reach Movie Database");
      })
  };



