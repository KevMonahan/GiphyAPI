$(document).ready(function () {
    let gameCharArray = ["Sonic", "Kirby", "Mario", "Bowser", "Cho'Gath", "Jim Raynor", "Sarah Kerrigan", "Tassadar", "Dr. Robotnik", "Sephiroth", "Zeratul", "Tyrael", "Sparkle Specialist", "Snorkel Ops"];
    reDrawCharButtons();


    $("#submitButton").on("click", function(){
        event.preventDefault();
        var userInput = $("input").val().trim();
        var capitalize = userInput.charAt(0).toUpperCase() + userInput.slice(1);
        gameCharArray.push(capitalize);
        console.log(capitalize)
        reDrawCharButtons();
    })

    function reDrawCharButtons() {

        $("#buttons").empty();

        gameCharArray.forEach(character => {
            var button = $("<button>")
            button.attr("data-person", character);
            button.addClass("gifButtons");
            button.html(character);
            $("#buttons").append(button);

            
        });

    }






    $("#buttons").on("click", ".gifButtons", function () {
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
                    characterImage.attr("data-still", results[i].images.fixed_height_still.url);
                    characterImage.attr("data-animate", results[i].images.fixed_height.url);
                    characterImage.attr("data-state", "still");

                    gifDiv.prepend(p);
                    gifDiv.prepend(characterImage);

                    $("#gifsGoHere").prepend(gifDiv);
                }
            });
    });
    $("#gifsGoHere").on("click", "img", function() {
        var state = $(this).attr("data-state");
        
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"))
          $(this).attr("data-state", "animate");
        }
  
        if (state === "animate") {
          $(this).attr("src", $(this).attr("data-still"))
          $(this).attr("data-state", "still");
        }
      });
})