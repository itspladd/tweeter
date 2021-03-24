$(document).ready( () => {
  // Cache the elements so we're not re-doing the search every time.
  const $counter = $('#tweetCharCounter');
  const $newTweetText = $('textarea#tweet-text');

  // Event listener to update counter when we add text to the new tweet field.
  $newTweetText.on('input', function() {
    updateCounter($(this));
  });
});

const updateCounter = ($textArea) => {
  const maxTweetChars = 140;
  const $counter = $textArea.parent().parent().find('output');
  length = $textArea.val().length;
  remaining = maxTweetChars - length;
  $counter.text(remaining);
  toggleCounterColor($counter, remaining);
};

const toggleCounterColor = ($counter, remaining) => {
  if (remaining > 20) {
    $counter.attr('class', '');
  }
  if (remaining < 20 && remaining > 0) {
    $counter.attr('class', 'yellow-text');
  }
  if (remaining <= 0) {
    $counter.attr('class', 'red-text');
  }
}