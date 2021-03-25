// When document is ready, render the tweets
$( () => {
  // Grab all the elements we need and save them in an object.
  // This makes it a lot easier to modularize functions.
  $window = $(window);
  $header = $('header');
  $navBar = $('nav');
  $navButton = $('nav div');
  $navButtonSymbol = $('nav div svg');
  $jumpButton = $('#jump-button');
  $newTweetBox = $('.new-tweet');
  $newTweetTextField = $('#tweet-text');
  $cachedElements = {
    $window,
    $header,
    $navBar,
    $navButton,
    $jumpButton,
    $navButtonSymbol,
    $newTweetBox,
  };

  // Load tweets, then render them once data is retrieved.
  loadTweets(renderTweets);

  // EVENT HANDLERS:
  // Prevents button from "flickering" on page load.
  // See layout.css for more info.
  $jumpButton.hide();
  $jumpButton.css('opacity', 100);

  // Add submission handler to new tweet form
  $('#new-tweet').on('submit', handleNewTweetSubmit);

  // Expand the "new tweet" box when clicked
  $navButton.click( () => toggleNewTweetBox($cachedElements));

  // Jump to the top of the page when we click this button.
  // Seems to automatically fire a scroll() event, so no need to trigger it manually to swap the button visibility.
  $jumpButton.click( () => $window.scrollTop(0));

  // Add scroll functionality. If we scroll past the header, swap the buttons.
  $window.scroll( () => toggleNavInterface($cachedElements));


});



