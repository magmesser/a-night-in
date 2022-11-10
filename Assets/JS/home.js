var recipeInput = $("#recipe-input");
var submitBtn = $("#submit-btn");

function formSubmit(event) {
    event.preventDefault();
    var queryUrl = "./results.html?q=" + recipeInput.val();

    location.assign(queryUrl);
}

submitBtn.click(formSubmit);