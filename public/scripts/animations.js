
const toggleNavInterface = ($cachedElements) => {
  if ($window.scrollTop() <= $header.height()) {
    $navBar.removeClass('small');
    $navButton.fadeIn(100);
    $jumpButton.fadeOut(100);
  } else {
    // Making the navbar small is a callback so the button fully fades before we shrink the bar.
    $navButton.fadeOut(100, () => $navBar.addClass('small'));
    $jumpButton.fadeIn(100);
  } 
};

// Expand/collapse the "new tweet" box
const toggleNewTweetBox = ($cachedElements) => {
  closeBox($newTweetErrorBox);
  $newTweetBox.slideToggle(300);
  $navButtonSymbol.animate({transform: 'rotate(180deg)'})
  $newTweetTextField.focus();
}

// Animate any element closed, if it's visible.
const closeBox = $box => {
  if($box.css('display') !== 'none') {
    $box.slideUp(300);
  }
}

// Generic function to put text in an element and display it.
// Used primarily to display errors.
const displayMessage = ($box, msg) => {
  $box.text(msg).slideDown();
}