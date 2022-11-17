var recipeInput = $("#recipe-input");
var movieInput = $("#movie-input");
var submitBtn = $("#submit-btn");
var randomBtn = $("#random-btn");

// modal
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

// submit
function formSubmit(event) {
  event.preventDefault();
  var queryUrl =
    "./results.html?q=" + recipeInput.val() + "&movie=" + movieInput.val();
  location.assign(queryUrl);
}

// randomizer 
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

submitBtn.click(formSubmit);
randomBtn.click(randomInputs);

// disable apply button until inputs complete
$(function () {
  $("#recipe-input, #movie-input").on("keyup change", function () {
    $("#submit-btn").prop(
      "disabled",
      $("#recipe-input").val() == "" || $("#movie-input").val() == ""
    );
  });
});
