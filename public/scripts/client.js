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

const renderTweets = tweetDataArray => {
  const $container = $('#all-tweets');
  for (let $tweet of tweetDataArray) {
    const $tweet = createTweetElement($tweet);
    $container.append($tweet);
  }
};

const createTweetElement = tweetData => {
  // Container element
  const $tweet = $('<article>', { class: 'tweet' });
  
  // Header elements
  const $header = $('<header>');
  const $avatar = $('<img>', { src: tweetData.user.avatars });
  const $username = $('<span>', { class: 'name' }).text(tweetData.user.name);
  const $handle = $('<span>', { class: 'handle' }).text(tweetData.user.handle);
  
  // Actual tweet content
  const $content = $('<section>').text(tweetData.content.text);

  // Footer elements
  const $footer = $('<footer>');
  const $postDate = $('<time>', { class: 'postDate' }).text(tweetData.created_at);
  
  // Action buttons (inside footer)
  // TODO: Change these to images, add interactivity via classes(?)
  const $actions = $('<div>', { class: 'actions' });
  const $flag = $('<span>').text('1');
  const $retweet = $('<span>').text('2');
  const $like = $('<span>').text('3');

  // TWEET, ASSEMBLE!
  $actions.append($flag, $retweet, $like);

  $header.append($avatar, $username, $handle);
  $footer.append($postDate, $actions);

  $tweet.append($header, $content, $footer);

//Alternate implementation with HTML structure in the JS.
/*   $tweet = $(`
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
  `); */

  return $tweet;
};


// When document is ready, render the tweets
$( () => renderTweets(data));