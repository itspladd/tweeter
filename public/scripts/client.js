// When document is ready, render the tweets
$( () => {
  $window = $(window);
  $header = $('header');
  $navBar = $('nav');
  $navButton = $('nav div');
  $jumpButton = $('#jump-button');

  // Prevents button from "flickering" on page load.
  // See layout.css for more info.
  $jumpButton.hide();
  $jumpButton.css('opacity', 100);

  // Add submission handler to new tweet form
  $('#new-tweet').on('submit', handleNewTweetSubmit);

  // Add handler for nav button to expand new tweet form
  $navButton.click( () => {
    $('.new-tweet').slideDown(300);
    $('#tweet-text').focus();
  });

  // Jump to the top of the page when we click this button.
  // Seems to automatically fire a scroll() event, so no need to trigger it manually to swap the button visibility.
  $jumpButton.click( () => {
    $window.scrollTop(0);
  })

  // Add scroll functionality. If we scroll past the header, swap the buttons.
  $window.scroll( () => {
    if ($window.scrollTop() <= $header.height()) {
      $navBar.removeClass('small');
      $navButton.fadeIn(100);
      $jumpButton.fadeOut(100);
    } else {
      // Making the navbar small is a callback so the button fully fades before we shrink the bar.
      $navButton.fadeOut(100, () => $navBar.addClass('small'));
      $jumpButton.fadeIn(100);
    } 
  });

  loadTweets(renderTweets);
});

const loadTweets = (callback) => {
  $.ajax({
    url: '/tweets',
    method: 'GET'
  })
  .then(res => callback(res))
  .catch(err => console.log(err));
}

// Add all tweets from input array to the #all-tweets element
const renderTweets = tweetDataArray => {
  // Make the array show the most recent tweets at the front.
  reversed = tweetDataArray.reverse();

  const $container = $('#all-tweets');
  $container.empty();
  for (let $tweet of reversed) {
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
    .text(millisecondsToString(tweetData.created_at));
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
  const $form = $(this)
  const $textBox = $form.find('textarea');
  const $errBox = $form.prev();
  const data = $form.serialize();

  // Slide the error box up before validating the tweet or submitting AJAX requests.
  // Otherwise, if there's a second error, the text updates while the box is still sliding closed.
  $errBox.slideUp('fast', () => {
    try {
      validateTweet(data);
      sendTweetToServer(data, $textBox);
    } catch (err) {
      // Set and show error box 
      $errBox.text(err.message).slideDown();
    }
  });
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

  if (type !== 'text') {
    err = `❕Serialized URI does not start with "text=", it instead begins with "${type}="`; 
  }
  if (!content) {
    err = `❕Tweet is empty, can't submit!`;
  }
  if (content.length > 140) {
    err = `❕Tweet is over 140 characters, can't submit!`;
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
    loadTweets(renderTweets);
  })
  .catch(err => console.log(err));
}

const clearText = $area => {
  // If there's an 'input' handler on this element (for instance, to update a counter), trigger it manually when we clear the value.
  $area.val('').trigger('input');
}

// Helper function to generate the proper date and/or "submitted X minutes/hours/days ago" text
const millisecondsToString = ms => {
  const dateCreated = new Date(ms); 
  const dateString = dateCreated.toString();
  
  // How long ago was this tweet posted in ms/s/min/hours/days?
  const deltaMs = Date.now() - ms;
  const deltaS = Math.round(deltaMs / 1000);
  const deltaM = Math.round(deltaS / 60);
  const deltaH = Math.round(deltaM / 60);
  const deltaD = Math.round(deltaH / 24);

  let timeString = 'posted ';

  if (deltaD > 2) {
    timeString += `on ${dateString}`;
  } else if (deltaH >= 24) {
    timeString += `${deltaD}d ago`;
  } else if (deltaM >= 60) {
    timeString += `${deltaH}h ago`;
  } else if (deltaS >= 60) {
    timeString += `${deltaM}m ago`;
  } else if (deltaS >= 0) {
    timeString += `${deltaS}s ago`;
  }

  return timeString;
}