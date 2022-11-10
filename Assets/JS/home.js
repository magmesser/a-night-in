var recipeInput = $("#recipe-input");
var submitBtn = $("#submit-btn");

function formSubmit(event) {
    event.preventDefault();
    var queryURL = "./results.html?q=" + recipeInput.val();

    location.assign(queryURL);
}

submitBtn.click(formSubmit);