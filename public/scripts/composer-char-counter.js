$(document).ready(function() {

  // updates character limit value depending on current input length
  $('#tweet-text').on('keyup', function() {
    const input = $(this).val();
    const counter = $(this).next().children('.tweet-counter');

    // shows remaining character from 140 character limit
    $(counter).text(140 - input.length);

    // if tweet is more than 140 characters, change text-colour to red
    if (input.length > 140) {
      $(counter).css("color", "red");
    } else {
      $(counter).css("color", "inherit");
    }
  })

});