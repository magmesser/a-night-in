// var movieApiKey = "k_ctt698mf";
var movieApiKey = "k_8sbsu5mx";
var recipeTitle = $("#recipe-title");
var recipeImg = $("#recipe-img");
var recipeUrl = $("#recipe-url");
var movieTitle = $("#title");
var moviePoster = $("#poster");
var ingredientsList = $("#ingredients-list");
var movieContainer = $("#movieContainer");
var dontLikeMovie = $("#dont-like-movie");
var dontLikeRecipe = $("#dont-like-recipe");
var localStorageModal = $("#local-storage-modal");
// var copied from home page for modal restart
var recipeInput = $("#recipe-input");
var movieInput = $("#movie-input");
var favoriteBtn = $("#favorite-btn");
var submitBtn = $("#submit-btn");
var randomBtn = $("#random-btn");

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
  var randomRecipe = values.hits[Math.floor(Math.random() * values.hits.length)].recipe;
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
  var randomMovie = movieData.results[Math.floor(Math.random() * movieData.results.length)];
  $("#title").text(randomMovie.title);
  $("#poster").attr("src", randomMovie.image);
  $("#rating").text("Rated: " + randomMovie.contentRating);
  $("#plot").text(randomMovie.plot);
}

grabParams();

dontLikeRecipe.click(function () {
  var apiParamsArr = document.location.search.split("&");
  var recipe = apiParamsArr[0].split("=").pop();
  favoriteBtn.removeClass("red darken-4");
  ingredientsList.empty();
  var ingredientsListHeading = $("<h5></h5>").html("Ingredients List");
  ingredientsListHeading.attr("style", "text-decoration: underline;");
  ingredientsList.append(ingredientsListHeading);
  recipeAPI(recipe);
});

dontLikeMovie.click(function () {
  var apiParamsArr = document.location.search.split("&");
  var movie = apiParamsArr[1].split("=").pop();
  favoriteBtn.removeClass("red darken-4");
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

function randomInputs(event) {
  var movieGenre =
    "action&animation&biography&comedy&crime&documentary&drama&fantasy&horror&musical&romance&sci-fi&thriller".split(
      "&"
    );
  var foodInput =
    "chicken&steak&salad&pasta&fish&seafood&beef&lamb&veal&pork&eggs&tacos&pizza".split(
      "&"
    );
  event.preventDefault();
  var queryUrl =
    "./results.html?q=" +
    foodInput[Math.floor(Math.random() * foodInput.length)] +
    "&movie=" +
    movieGenre[Math.floor(Math.random() * movieGenre.length)];
  location.assign(queryUrl);
}

function populateLocalStorage() {
  var localStorageValue = localStorage.getItem("favorites");
  var recipeNMovie = {
    recipeTitle: recipeTitle.text(),
    recipeImg: recipeImg.attr("src"),
    recipeUrl: recipeUrl.attr("href"),
    movieTitle: movieTitle.text(),
    moviePoster: moviePoster.attr("src"),
  };
  if (localStorageValue) {
    var parsedValue = JSON.parse(localStorageValue);
    var value = parsedValue.find((e) => e.recipeTitle == recipeNMovie.recipeTitle && e.movieTitle == recipeNMovie.movieTitle);
    var index = parsedValue.indexOf(value);
    if (index > -1) {
      favoriteBtn.removeClass("red darken-4");
      parsedValue.splice(index);
      localStorage.setItem("favorites", JSON.stringify(parsedValue));
      checkLocalStorage();
    } else {
      favoriteBtn.addClass("red darken-4");
      parsedValue.push(recipeNMovie);
      localStorage.setItem("favorites", JSON.stringify(parsedValue));
      checkLocalStorage();
    }
  } else {
    favoriteBtn.addClass("red darken-4");
    localStorage.setItem("favorites", JSON.stringify([recipeNMovie]));
    checkLocalStorage();
  }
}

function checkLocalStorage() {
  var localStorageValue = localStorage.getItem("favorites");
  localStorageModal.empty();
  if (localStorageValue) {
    var parsedValue = JSON.parse(localStorageValue);
    for (city in parsedValue) {
      populateStoredValues(parsedValue[city]);
    }
  }
}

function populateStoredValues(values) {
  var recipeNMovieContainer = $("<div></div>");
  recipeNMovieContainer.addClass("local-storage-container");
  localStorageModal.append(recipeNMovieContainer);
  var storedRecipeContainer = $("<div></div>");
  storedRecipeContainer.attr("class", "container-recipe-movie");
  var storedRecipeTitle = $("<div></div>").html(values.recipeTitle);
  storedRecipeContainer.append(storedRecipeTitle);
  var storedRecipeUrl = $("<a></a>");
  var storedRecipeImg = $("<img></img>");
  storedRecipeImg.attr("src", values.recipeImg);
  storedRecipeUrl.attr("href", values.recipeUrl);
  storedRecipeImg.attr("style", "border: 10px solid white");
  storedRecipeUrl.append(storedRecipeImg);
  storedRecipeContainer.append(storedRecipeUrl);
  recipeNMovieContainer.append(storedRecipeContainer);
  var storedMovieContainer = $("<div></div>");
  storedMovieContainer.attr("class", "container-recipe-movie");
  var storedMovieTitle = $("<div></div>").html(values.movieTitle);
  storedMovieContainer.append(storedMovieTitle);
  var storedMoviePoster = $("<img></img>");
  storedMoviePoster.attr("src", values.moviePoster);
  storedMoviePoster.attr("style", "width: 300px; height: 400px; border: 10px solid white");
  storedMovieContainer.append(storedMoviePoster);
  recipeNMovieContainer.append(storedMovieContainer);
}

checkLocalStorage();
favoriteBtn.click(populateLocalStorage);
submitBtn.click(formSubmit);
randomBtn.click(randomInputs);
$("#clear-local-storage").click(function () {
  favoriteBtn.removeClass("red darken-4");
  localStorage.clear();
  checkLocalStorage();
});

$(function () {
  $("#recipe-input, #movie-input").on("keyup change", function () {
    $("#submit-btn").prop(
      "disabled",
      $("#recipe-input").val() == "" || $("#movie-input").val() == ""
    );
  });
});
