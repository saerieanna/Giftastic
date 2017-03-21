$(document).ready(function(){

 var moods = ["Happy", "Sad", "Excited", "Scared", "Nervous", "Tired", "Lazy", "Sick", "Proud", "Anger"];

//function to make buttons with the array above//
  function renderButtons() {
 	$("#feelingsbuttons").empty();

  	for (var i = 0; i < moods.length; i++) {
 		var a = $("<button>");
 		a.addClass("mood");
  		a.attr("data-state", moods[i]);
 		a.text(moods[i]);
 		$("#feelingsbuttons").append(a);
  	    }
  }

//function to push input from form up to buttons, how do I make them into a button?//
  $("#addFeeling").on("click", function(event) {
  	event.preventDefault();

  	var mood = $("#feeling-input").val().trim();
  	var b = $("<button>");
  	b.text(mood);
  	moods.push(b);
  	//console.log(moods);
  	$("#feelingsbuttons").append(b);
  	})
 	renderButtons();



 $("button").on("click", function() {
      var feeling = $(this).attr("data-state");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        feeling + "&api_key=dc6zaTOxFJmzC&limit=10";

      //calling AJAX//
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        .done(function(response) {
          var results = response.data;

          for (var i = 0; i < results.length; i++) {
            var gifDiv = $("<div class='item'>");

            var rating = results[i].rating;
            var p = $("<p>").text("Rating: " + rating);

            var imageUrl = results[i].images.fixed_height_still.url;
            $("imageUrl").addClass("static");

            var animateUrl = results[i].images.fixed_height.url;
            $("animateUrl").addClass("animated");

           var image = $("<img>").attr("src", imageUrl);
           var animatedimage = $("<img>").attr("src", animateUrl);

            gifDiv.prepend(p);
            gifDiv.prepend(image)

            $("#feelingsgifshere").prepend(gifDiv);
			}
           
           
           $("img").on("click", function() {
       		image.attr("src", animateUrl);
    		})
         
            
});


});

})
//incorporate this at the end w/variables from above
$(document).on('click','.feelingsgifshere',function(){
    var state = $(this).attr('data-state');

            // If the clicked image's state is still, update its src attribute to animated.
             // Then, set the image's data-state to animated
             // Else set src to the data-state still value
            if(state ==='static'){
                $(this).attr('src', $(this).data('animateUrl'));
                $(this).attr('data-state','animateUrl');
            } else {
                $(this).attr('src',$(this).data('imageUrl'));
                $(this).attr('data-state','imageUrl');
            }
})	   




 