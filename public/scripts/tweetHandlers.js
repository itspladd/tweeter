//Creates a single tweet <article> element, given an input of data about that tweet.
const createTweetElement = tweetData => {
  // Big long SVG stuff.
  const svgMeta = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="flag" class="svg-inline--fa fa-flag fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">';
  const flagPath = '<path fill="currentColor" d="M349.565 98.783C295.978 98.783 251.721 64 184.348 64c-24.955 0-47.309 4.384-68.045 12.013a55.947 55.947 0 0 0 3.586-23.562C118.117 24.015 94.806 1.206 66.338.048 34.345-1.254 8 24.296 8 56c0 19.026 9.497 35.825 24 45.945V488c0 13.255 10.745 24 24 24h16c13.255 0 24-10.745 24-24v-94.4c28.311-12.064 63.582-22.122 114.435-22.122 53.588 0 97.844 34.783 165.217 34.783 48.169 0 86.667-16.294 122.505-40.858C506.84 359.452 512 349.571 512 339.045v-243.1c0-23.393-24.269-38.87-45.485-29.016-34.338 15.948-76.454 31.854-116.95 31.854z"></path>';
  const retweetPath = '<path fill="currentColor" d="M629.657 343.598L528.971 444.284c-9.373 9.372-24.568 9.372-33.941 0L394.343 343.598c-9.373-9.373-9.373-24.569 0-33.941l10.823-10.823c9.562-9.562 25.133-9.34 34.419.492L480 342.118V160H292.451a24.005 24.005 0 0 1-16.971-7.029l-16-16C244.361 121.851 255.069 96 276.451 96H520c13.255 0 24 10.745 24 24v222.118l40.416-42.792c9.285-9.831 24.856-10.054 34.419-.492l10.823 10.823c9.372 9.372 9.372 24.569-.001 33.941zm-265.138 15.431A23.999 23.999 0 0 0 347.548 352H160V169.881l40.416 42.792c9.286 9.831 24.856 10.054 34.419.491l10.822-10.822c9.373-9.373 9.373-24.569 0-33.941L144.971 67.716c-9.373-9.373-24.569-9.373-33.941 0L10.343 168.402c-9.373 9.373-9.373 24.569 0 33.941l10.822 10.822c9.562 9.562 25.133 9.34 34.419-.491L96 169.881V392c0 13.255 10.745 24 24 24h243.549c21.382 0 32.09-25.851 16.971-40.971l-16.001-16z"></path>'
  const likePath = '<path fill="currentColor" d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"></path>';
  const svgEnd = '</svg>';

  const flag = svgMeta + flagPath + svgEnd;
  const retweet = svgMeta + retweetPath + svgEnd;
  const like = svgMeta + likePath + svgEnd;
  
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
    .text(millisecondsToString(tweetData.created_at));
  // Action buttons (inside footer) (TODO: Change these to images, add interactivity via classes(?)
  const $actions = $('<div>', { class: 'actions' });
  const $flag = $(flag);
  const $retweet = $(retweet);
  const $like = $(like);

  // Build action buttons and footer
  $actions.append($flag, $retweet, $like);
  $footer.append($postDate, $actions);

  // Build tweet and return
  $tweet.append($header, $content, $footer);

  return $tweet;
};

const handleNewTweetSubmit = function(event) {
  event.preventDefault();

  // This function doesn't used the cached elements like the animations.
  // We want to make sure this function ONLY uses the data in the form that fired the 'submit' event. 
  // Ideally, this would make it easier in the future if we have multiple forms on the page that someone could submit a tweet from.
  const $form = $(this);
  const $textBox = $form.find('textarea');
  const $errBox = $form.prev();
  const data = $form.serialize();
  const tweetContent = $textBox.val();
  
  // Slide the error box up before validating the tweet or submitting AJAX requests.
  // Otherwise, if there's a second error, the text updates while the box is still sliding closed.
  $errBox.slideUp('fast', () => {
    try {
      // validateTweet will throw a custom error if the validation fails, preventing the tweet from being submitted.
      validateTweet(tweetContent);
      // We don't clear the textbox quite yet, since we want to wait for successful submission to server.
      sendTweetToServer(data, $textBox, $errBox);
    } catch (err) {
      // Set and show error box 
      displayMessage($errBox, err.message);
    }
  });
};

// Validate the content in the tweet to make sure it's OK.
const validateTweet = content => {
  // Error is blank; if it doesn't stay blank, we throw an error.
  let err = '';

  if (!content.trim()) {
    err = `❕You can't make a blank tweet!`
  }
  if (content.length > 140) {
    err = `❕Tweets must be under 140 characters!`;
  }

  // If we've created an error message, throw the error.
  // Otherwise, nothing happens!
  if (err) {
    throw new Error(err);
  }
};

// Send the tweet, then clear the input form and load tweets if successful
const sendTweetToServer = (data, $textBox, $errBox) => {
  $.ajax({
    url: `/tweets/`,
    method: 'POST',
    data
  })
  .then(res => {
    clearText($textBox);
    loadTweets(renderTweets);
  })
  .catch(err => {
    // TODO: Log the error in a better way.
    console.log(err);
    const msg = 'There was a problem submitting your tweet to the server. Try again later!';
    displayMessage($errBox, msg);
  });
}

const loadTweets = (callback) => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then(res => callback(res))
  .catch(err => console.log(err));
}

// Clear the #all-tweets element, then add all tweets from input array to it (in 'reverse' order via prepend) 
const renderTweets = tweetDataArray => {

  const $container = $('#all-tweets');
  $container.empty();
  for (let $tweet of tweetDataArray) {
    $tweet = createTweetElement($tweet);
    $container.prepend($tweet);
  }
};

