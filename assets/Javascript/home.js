$(document).ready(function () {
    let gameCharArray = ["Sonic", "Kirby", "Mario", "Bowser", "Cho'Gath", "Jim Raynor", "Sarah Kerrigan", "Tassadar", "Dr. Robotnik", "Sephiroth", "Zeratul", "Tyrael", "Sparkle Specialist", "Snorkel Ops"];
    reDrawCharButtons();

    function reDrawCharButtons() {

        $("#buttons").empty();

        gameCharArray.forEach(character => {
            var button = $("<button>")
            button.attr("data-person", character);
            button.addClass("gifButtons")
            button.html(character)   
            $("#buttons").append(button);

            
        });

    }






    $(".gifButtons").on("click", function () {
        var character = $(this).attr("data-person");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            character + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div class='item'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var characterImage = $("<img>");
                    characterImage.attr("src", results[i].images.fixed_height_still.url);

                    gifDiv.prepend(p);
                    gifDiv.prepend(characterImage);

                    $("#gifsGoHere").prepend(gifDiv);
                }
            });
    });
})