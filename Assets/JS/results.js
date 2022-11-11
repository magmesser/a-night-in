var movieApiKey = "k_ctt698mf";
var recipeImg = $("#recipe-img");
var recipeUrl = $("#recipe-url");
var ingredientsList = $("#ingredients-list")
var movieContainer = $("#movieContainer");

function grabParams() {
  var apiParamsArr = document.location.search.split("&");
  var recipe = apiParamsArr[0].split("=").pop()
  var movie = apiParamsArr[1].split("=").pop()
  recipeAPI(recipe);
  getMovies(movie);
}

var getMovies = function(movieName) {
    var movieApiUrl = "https://imdb-api.com/en/API/SearchMovie/" + movieApiKey + "/" + movieName + "&count=5";

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
        displayMovieSearch(data);
        
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

function recipeAPI(recipe) {
    var recipeQueryUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + recipe + "&app_id=ffb9b7d6&app_key=177ebaaec33bbf5decf819cd890a664a"
    fetch(recipeQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            updateRecipeCard(data)
        })
}

function updateRecipeCard(values) {
    var randomRecipe = values.hits[Math.floor(Math.random() * values.hits.length)].recipe;
    var ingredients = randomRecipe.ingredientLines
    recipeImg.attr("src", randomRecipe.image)
    recipeUrl.attr("href", randomRecipe.url);
    console.log(randomRecipe);
    for (let i = 0; i < ingredients.length; i++) {
        var listIngredient = $("<div></div>").html(ingredients[i]);
        ingredientsList.append(listIngredient);
    }
}

function displayMovieSearch(results) {
  
  for (var i = 0; results.length; i++){
    var movieTitleEl = $('<h1></h1>').text(results[i].title);
    movieContainer.append(movieTitleEl);
  }
};

grabParams();
