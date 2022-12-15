$(document).ready(function() {

  $('#tweet-text').on('keyup', function() {
    const input = $(this).val();
    const counter = $(this).next().children('.tweet-counter');
    $(counter).text(140 - input.length);
    
    if (input) {
      $(counter).text(140 - input.length);
    }

    // if tweet is more than 140 characters, change text-colour to red
    if (input.length > 140) {
      $(counter).css("color", "red");
    } else {
      $(counter).css("color", "inherit");
    }
  })

});