/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  const createTweetElement = (object) => {
    
    // Check if the 'user' property exists on the object, and use a default value if it doesn't
    const userName = object.hasOwnProperty('user') ? object.user.name : '';
    const userAvatar = object.hasOwnProperty('user') ? object.user.avatars : '';
    const userHandle = object.hasOwnProperty('user') ? object.user.handle : '';
    const tweetContent = object.hasOwnProperty('content') ? object.content.text : '';
    const creationDate = object.hasOwnProperty('created_at') ? object['created_at'] : ''; 

    //use timeago script to display time passed since tweet
    const time = timeago.format(creationDate);

    // tweet body template
    const tweet = `
    <article class="tweet">
        <header>
          <img src="${userAvatar}" alt="user-avatar" width="50" height="50">
          <span class="tweet-user-name">${userName}</span>
          <span class="tweet-user-handle">${userHandle}</span>
        </header>
        <p class="tweet-body">
        ${tweetContent}
        </p>
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
  const renderTweets = (array, body) => {
    // Loop through the tweets in the array
    $(array).each(function(index) {
      // Create a tweet element for each tweet in the array and prepend to the specified body element
      const tweet = createTweetElement(array[index])
      $(body).prepend(tweet);
    })
    return;
  };
  
  // listens for submit event
  $( "#tweet-form" ).submit(function( event ) {
    event.preventDefault();

    const input = $(this).children();
    const inputLength = input.val().length;
    
    // validation checks before tweet submission
    if (inputLength <= 0) {
      alert('Tweet cannot be empty!');
      return;
    }

    if (inputLength > 140) {
      alert('Tweet should be less than 140 characters!');
      return;
    }

    // handle POST request via AJAX and send data to server as a query string
    $.post('/tweets', $(this).serialize());

    // // fetch submitted tweet after submission and add to page
    $.get('/tweets')
      .then(response => {
        const $lastIndex = $(response).last()
        renderTweets($lastIndex)
      });
  });

  // fetch JSON data from /tweets and pass it to renderTweets for rendering
  const loadtweets = (json) => {
    $.get(json)
      .then(response => renderTweets(response));
  };

  loadtweets('/tweets');
});