$(document).ready( () => {
  const $counter = $('#tweetCharCounter');
  $('textarea#tweet-text').on('input', function() {
    updateCounter($counter, this);
  });
});

const updateCounter = function($counter, textArea) {
  const maxTweetChars = 140;
  length = textArea.value.length;
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