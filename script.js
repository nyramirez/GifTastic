$(document).ready(function () {

    let topics = [];
    let userInput = $("#customerInputGiphy");

    function newButton() {
        $("#appendArea").empty();

        for (var i = 0; i <= (topics.length - 1); i++) {
            var a = $("<button>");
            // Adding a class of movie to our button
            a.addClass("oldSearchButton btn btn-primary");
            // Adding a data-attribute
            a.attr("data-name", topics[i]);
            // Providing the initial button text
            a.text(topics[i]);
            // Adding the button to the HTML
            $("#appendArea").append(a);
        }
    }

    function buttonName() {
        // console.log($(this).attr("data-name"));
        let query = $(this).attr("data-name"); 
        console.log(query);

        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&limit=10&api_key=cudRyP4Afc59sPX2EWMlJn9BYaPuJYPY"

        $.ajax({
            url:queryURL,
            method: "GET"
        }).then(function(res){
            console.log(res.data);
        });

    }

    $("#searchButton").on("click", function () {
        let newTopic = userInput.val().trim();
        topics.push(newTopic);
        // checking the new value inside the array
        console.log(topics);
        console.log("****************");

        // inputing new button
        newButton();
        // code to empty the form
        $("#customerInputGiphy, textarea").val("");
    });

    $(document).on("click", ".oldSearchButton", buttonName);
    newButton();

});