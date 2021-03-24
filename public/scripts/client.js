/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const loadTweets = () => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then(res => renderTweets(res))
  .catch(err => console.log(err));
}

// Add all tweets from input array to the #all-tweets element
const renderTweets = tweetDataArray => {
  const $container = $('#all-tweets');
  for (let $tweet of tweetDataArray) {
    $tweet = createTweetElement($tweet);
    $container.append($tweet);
  }
};

//Build the tweet <article> element
const createTweetElement = tweetData => {
  // Container element
  const $tweet = $('<article>', { class: 'tweet' });
  
  // Header elements
  const $header = $('<header>');
  const $avatar = $('<img>', { src: tweetData.user.avatars });
  const $username = $('<span>', { class: 'name' })
    .text(tweetData.user.name);
  const $handle = $('<span>', { class: 'handle' })
    .text(tweetData.user.handle);

  // Build header
  $header.append($avatar, $username, $handle);

  // Actual tweet content
  const $content = $('<section>')
    .text(tweetData.content.text);

  // Footer elements
  const $footer = $('<footer>');
  const $postDate = $('<time>', { class: 'postDate' })
    .text(tweetData.created_at);
  // Action buttons (inside footer) (TODO: Change these to images, add interactivity via classes(?)
  const $actions = $('<div>', { class: 'actions' });
  const $flag = $('<span>').text('1');
  const $retweet = $('<span>').text('2');
  const $like = $('<span>').text('3');

  // Build action buttons and footer
  $actions.append($flag, $retweet, $like);
  $footer.append($postDate, $actions);

  // Build tweet and return
  $tweet.append($header, $content, $footer);

  return $tweet;
};

const handleNewTweetSubmit = function(event) {
  event.preventDefault();
  const data = $(this).serialize();
  sendTweetToServer(data, console.log)
};

const sendTweetToServer = (data, callback) => {
  $.ajax({
    url: `/tweets/`,
    method: 'POST',
    data
  })
  .then(res => {
    clearNewTweetText();
    callback(res);
  })
  .catch(err => console.log(err));
}

const clearNewTweetText = () => {
  $newTweetTextArea.val('');
}

// When document is ready, render the tweets
$( () => {
  // Cache important elements
  $newTweetTextArea = $('#tweet-text');
  $allTweets = $('#all-tweets');



  // Add handler to new tweet form
  $('#new-tweet').on('submit', handleNewTweetSubmit);

  loadTweets();
});