// When document is ready, render the tweets
$( () => {
  // Cache important elements
  const $counter = $('#tweetCharCounter');
  const $newTweetTextArea = $('#tweet-text');
  const $allTweets = $('#all-tweets');



  // Add handler to new tweet form
  $('#new-tweet').on('submit', handleNewTweetSubmit);

  loadTweets();
});

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
  $container.empty();
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
  const $textBox = $(this).find('textarea');
  try {
    validateTweet(data);
    sendTweetToServer(data, $textBox);
  } catch (err) {
    alert(err)
  }
};

// Validate the content in the tweet to make sure it's OK.
// TODO: May have to tweak this if we change the new tweet functionality.
const validateTweet = serializedTweet => {
  // Separate the serialized tweet into its component parts
  splitText = serializedTweet.split('=');
  type = splitText[0];
  content = splitText[1];
  // Error is blank; if it doesn't stay blank, we throw an error.
  let err = '';

  // This will prob
  if (type !== 'text') {
    err = `Serialized URI does not start with "text=", it instead begins with "${type}="`; 
  }
  if (!content) {
    err = `Tweet is empty, can't submit!`;
  }
  if (content.length > 140) {
    err = `Tweet is over 140 characters, can't submit!`;
  }

  // If we've created an error message, throw the error.
  // Otherwise, nothing happens!
  if (err) {
    throw new Error(err);
  }
};

const sendTweetToServer = (data, $textBox) => {
  $.ajax({
    url: `/tweets/`,
    method: 'POST',
    data
  })
  .then(res => {
    clearText($textBox);
    loadTweets();
  })
  .catch(err => console.log(err));
}

const clearText = $area => {
  // If there's an 'input' handler on this element (for instance, to update a counter), trigger it manually when we clear the value.
  $area.val('').trigger('input');
}
