$(document).ready(function() {

  // Listen for a 'keyup' event text input area
  $('#tweet-text').on('keyup', function() {
    const input = $(this).val();

    // Target the tweet counter element
    const counter = $(this).next().children('.tweet-counter');

    // Update the text of the tweet counter to show the remaining number of characters
    $(counter).text(140 - input.length);

    // If the input length is greater than 140 characters,
    // set the color of the tweet counter to red
    // to indicate that the user has exceeded the maximum limit
    // Otherwise, set the color to the default (inherit)
    (input.length > 140) ? $(counter).css("color", "red") : $(counter).css("color", "inherit");
  })
});