// var movieApiKey = "k_ctt698mf"; MM key
var movieApiKey = "k_8sbsu5mx";
var recipeTitle = $("#recipe-title")
var recipeImg = $("#recipe-img");
var recipeUrl = $("#recipe-url");
var ingredientsList = $("#ingredients-list");
var movieContainer = $("#movieContainer");
var dontLikeMovie = $("#dont-like-movie");
var dontLikeRecipe = $("#dont-like-recipe");
// var copied from home page for modal restart
var recipeInput = $("#recipe-input");
var movieInput = $("#movie-input");
var submitBtn = $("#submit-btn");

function grabParams() {
  var apiParamsArr = document.location.search.split("&");
  var recipe = apiParamsArr[0].split("=").pop();
  var movie = apiParamsArr[1].split("=").pop();
  recipeAPI(recipe);
  getMovies(movie);
}

var getMovies = function (movieGenre) {
  var movieApiUrl =
    "https://imdb-api.com/en/API/AdvancedSearch/" +
    movieApiKey +
    "/?title_type=feature&genres=" +
    movieGenre;

  fetch(movieApiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Error: " + response.statusText);
      }
    })
    .then(function (data) {
      displayMovieSearch(data);
    });
};

function recipeAPI(recipe) {
  var recipeQueryUrl =
    "https://api.edamam.com/api/recipes/v2?type=public&q=" +
    recipe +
    "&app_id=ffb9b7d6&app_key=177ebaaec33bbf5decf819cd890a664a";
  fetch(recipeQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      updateRecipeCard(data);
    });
}

function updateRecipeCard(values) {
  var randomRecipe =
    values.hits[Math.floor(Math.random() * values.hits.length)].recipe;
  var ingredients = randomRecipe.ingredientLines;
  recipeTitle.html(randomRecipe.label);
  recipeImg.attr("src", randomRecipe.image);
  recipeUrl.attr("href", randomRecipe.url);
  for (let i = 0; i < ingredients.length; i++) {
    var listIngredient = $("<div></div>").html(ingredients[i]);
    ingredientsList.append(listIngredient);
  }
}

function displayMovieSearch(movieData) {
  var randomMovie =
    movieData.results[Math.floor(Math.random() * movieData.results.length)];

  var movieTitleEl = $("#title").text(randomMovie.title);
  movieContainer.append(movieTitleEl);

  var movieImgEl = $("#poster").attr("src", randomMovie.image);
  movieContainer.append(movieImgEl);

  var movieRatingEl = $("#rating").text("Rated: " + randomMovie.contentRating);
  movieContainer.append(movieRatingEl);

  var moviePlotEl = $("#plot").text(randomMovie.plot);
  movieContainer.append(moviePlotEl);
  
}

grabParams();

dontLikeRecipe.click(function () {
  var apiParamsArr = document.location.search.split("&");
  var recipe = apiParamsArr[0].split("=").pop();
  ingredientsList.empty();
  recipeAPI(recipe);
});

dontLikeMovie.click(function () {
  var apiParamsArr = document.location.search.split("&");
  var movie = apiParamsArr[1].split("=").pop();
  getMovies(movie);
});

// copy of Modal from home page

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".modal");
  M.Modal.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  M.FormSelect.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {
  var auto = document.querySelectorAll(".autocomplete");
  M.Autocomplete.init(auto, {
    data: {
      Chicken: null,
      Pasta: null,
      Pizza: null,
      Salad: null,
    },
    limit: 1,
  });
});

function formSubmit(event) {
  event.preventDefault();
  var queryUrl =
    "./results.html?q=" + recipeInput.val() + "&movie=" + movieInput.val();
  location.assign(queryUrl);
  grabParams();
}

submitBtn.click(formSubmit);
