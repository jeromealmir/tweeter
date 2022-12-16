/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Function to sterilize user input to prevent XSS
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (object, class_) => {
    
    // Check if the 'user' property exists on the object, and use a default value if it doesn't
    const userName = object.hasOwnProperty('user') ? object.user.name : '';
    const userAvatar = object.hasOwnProperty('user') ? object.user.avatars : '';
    const userHandle = object.hasOwnProperty('user') ? object.user.handle : '';
    const tweetContent = object.hasOwnProperty('content') ? object.content.text : '';
    const creationDate = object.hasOwnProperty('created_at') ? object['created_at'] : '';

    // Sterilized input
    const safeHTML = `<p class="tweet-body">${escape(tweetContent)}</p>`;

    // Use the timeago script to format the creation date
    const time = timeago.format(creationDate);

    // Create the tweet body using template literals
    const tweet = `
    <article class="${class_}">
        <header>
          <img src="${userAvatar}" alt="user-avatar" width="50" height="50">
          <span class="tweet-user-name">${userName}</span>
          <span class="tweet-user-handle">${userHandle}</span>
        </header>
        ${safeHTML}
        <footer>
          <time class="timeago">${time}</time>
          <span class="tweet-footer-icons">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-solid fa-retweet"></i>
            <i class="fa-solid fa-heart"></i>
          </span>
        </footer>
      </article>
    `;
  
    return tweet;
  };

  // Render an array of tweets on the page
  const renderTweets = (array, body, class_) => {
    // Loop through the tweets in the array
    $(array).each(function(index) {
      // Create a tweet element for each tweet in the array and prepend to the specified body element
      const tweet = createTweetElement(array[index], class_);
      $(body).prepend(tweet);
    });
    return;
  };

  // Listen for the submit event of the tweet form
  $("#tweet-form").submit(function(event) {
    event.preventDefault();

    const input = $(this).children();
    const inputLength = input.val().length;
    
    // Check if input is empty when submitting the tweet and show message if error found
    if (inputLength === 0) {
      $('.form-error-empty').slideDown();
      return;
    }

    // Check if input is more than 140 characters when submitting the tweet and show message if error found
    if (inputLength > 140) {
      $('.form-error-charlimit').slideDown();
      return;
    }

    // Handle the POST request using AJAX and format data as query string
    $.post('/tweets', $(this).serialize())
      // .done ensures POST request was successful before fetching data back
      .done(function() {
        // Fetch the submitted tweet and add it to the page
        $.get('/tweets')
          .then(response => {
            // Get the last tweet in the response
            const $lastIndex = $(response).last();
            // Render the tweet in the '.tweets-container' element
            renderTweets($lastIndex, '.tweets-container');
          });
      });

  });

  // Hide error message when textarea is clicked
  $('#tweet-text').on("click", function() {
    $('.form-error-empty').slideUp()
    $('.form-error-charlimit').slideUp()
  });

  // Load tweets from the specified JSON URL
  const loadtweets = (json) => {
    $.get(json)
    // Render the tweets in the '.tweets-container' element
      .then(response => renderTweets(response, '.tweets-container'));
  };

  // Load tweets from the '/tweets' URL
  loadtweets('/tweets');
});