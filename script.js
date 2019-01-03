$(document).ready(function () {

    let topics = [];
    let userInput = $("#customerInputGiphy");

    function newButton() {
        $("#appendArea").empty();


        for (var i = 0; i <= (topics.length - 1); i++) {
            let a = $("<button>");
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
        // showing query from user on console
        // console.log(query);

        let queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&limit=10&api_key=cudRyP4Afc59sPX2EWMlJn9BYaPuJYPY"

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (res) {
            // console.log(res.data);
            let response = res.data;
            // console.log(response);
            // console.log(response.length);
            // console.log(response[0]);
            // console.log(response[0].images);
            // // Still Image
            // console.log(response[0].images.original_still.url);
            // // Gig moving
            // console.log(response[0].images.original.url);
            // // rating
            // console.log(response[0].rating);
            // Giphy Title
            // console.log(response[0].title);


            $("#giphyArea").empty();
            for (var j = 0; j <= (response.length - 1); j++) {
                let b = $("<img>");
                // Adding a class of movie to our button
                b.addClass("gif");
                b.attr("id", "gif" + j);
                b.attr("src", response[j].images.original_still.url);
                b.attr("data-still", response[j].images.original_still.url);
                b.attr("data-animate", response[j].images.original.url);
                b.attr("alt", response[j].title);
                b.attr("data-state", "still");
                $("#giphyArea").append(b);
            }

            for (var k = 0; k <= (response.length - 1); k++) {
                // adding text per image
                let c = $("<h5>");
                c.addClass("gifText");
                c.text("Rating: " + response[k].rating);
                $("#gif" + k).after(c);
                console.log("Rating: " + response[k].rating);
            }

            $(".gif").on("click", function () {
                var state = $(this).attr("data-state");
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
            });


        });

    }

    $("#searchButton").on("click", function () {
        let newTopic = userInput.val().trim();
        topics.push(newTopic);
        // checking the new value inside the array
        // console.log(topics);
        // console.log("****************");

        // inputing new button
        newButton();
        // code to empty the form
        $("#customerInputGiphy, textarea").val("");
    });

    $(document).on("click", ".oldSearchButton", buttonName);
    newButton();

});