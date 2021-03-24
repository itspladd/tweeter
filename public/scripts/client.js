/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
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

const renderTweets = tweets => {
  $container = $('#all-tweets');
  for (let $tweet of tweets) {
    $tweet = createTweetElement($tweet);
    $container.append($tweet);
  }
};

const createTweetElement = tweetData => {
  $tweet = $(`
    <article class="tweet">
      <header>
        <img src="${tweetData.user.avatars}">
        <span class="name">${tweetData.user.name}</span>
        <span class="handle">${tweetData.user.handle}</span>
      </header>
    
      <section>${tweetData.content.text}</section>
      <footer>
        <time class="postDate">${tweetData.created_at}</time>
        <div class="actions">
          <span>1</span>
          <span>2</span>
          <span>3</span>
      </footer>
    </article>
  `);

  return $tweet;
};


// When document is ready, render the tweets
$( () => renderTweets(data));