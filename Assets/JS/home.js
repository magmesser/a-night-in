var recipeInput = $("#recipe-input");
var movieInput = $("#movie-input")
var submitBtn = $("#submit-btn");



document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.modal');
  M.Modal.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('select');
  M.FormSelect.init(elems);
});

document.addEventListener('DOMContentLoaded', function () {
  var auto = document.querySelectorAll('.autocomplete');
  M.Autocomplete.init(auto, {
    data: {
      'Chicken': null,
      'Pasta': null,
      'Pizza': null,
      'Salad': null
    },
    limit: 1
  })
});

function formSubmit(event) {
  event.preventDefault();
  var queryUrl = "./results.html?q=" + recipeInput.val() + "&movie=" + movieInput.val();
  location.assign(queryUrl);
}

submitBtn.click(formSubmit);

