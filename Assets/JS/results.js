var movieApiKey = "k_ctt698mf";

function grabParams() {
  var apiParamsArr = document.location.search.split("?");
  console.log(apiParamsArr);
  var recipe = apiParamsArr[1].split("=").pop()
  recipeAPI(recipe);
}

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


function recipeAPI(recipe) {
    var recipeQueryUrl = "https://api.edamam.com/api/recipes/v2?type=public&q=" + recipe + "&app_id=ffb9b7d6&app_key=177ebaaec33bbf5decf819cd890a664a"
    fetch(recipeQueryUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            updateRecipeCard(data)
        })
}

function updateRecipeCard(values) {
    var randomRecipe = values.hits[Math.floor(Math.random() * values.hits.length)].recipe;
    console.log(randomRecipe)
    var ingredients = randomRecipe.ingredientLines
    testCard.attr("src", randomRecipe.image)
    for (let i = 0; i < ingredients.length; i++) {
        var listIngredient = $("<div></div>").html(ingredients[i]);
        ingredientCard.append(listIngredient);
    }
}

grabParams();
