var recipeInput = $("#recipe-input");
var submitBtn = $("#submit-btn");

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    M.Modal.init(elems);
  });

function formSubmit(event) {
    event.preventDefault();
    var queryUrl = "./results.html?q=" + recipeInput.val();

    location.assign(queryUrl);
}

submitBtn.click(formSubmit);

