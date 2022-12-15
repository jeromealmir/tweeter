/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function(){

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

  const createTweetElement = (object) => {

    // data variables from tweet object. Use && and || guard operators to prevent object retrieval typeError
    const userName = object.user && object.user.name || 'anonymous';
    const userAvatar = object.user && object.user.avatars || 'https://i.imgur.com/gueO6ye.png';
    const userHandle = object.user && object.user.handle || '@anonymous';
    const tweetContent = object.content && object.content.text || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit';
    const creationDate = object['created_at'] || '0';

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
          <span>${creationDate} days ago</span>
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

  // loops through tweets in the data, process body template and append to tweets container
  const renderTweets = (array) => {
    for (const item of array) {
      const $tweet = createTweetElement(item)
      $('.tweets-container').append($tweet);
    }
    return;
  };

  renderTweets(data);
});

