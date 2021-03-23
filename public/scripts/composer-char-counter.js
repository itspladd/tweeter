$(document).ready( () => {
  const $counter = $('#tweetCharCounter');
  const maxTweetChars = 140;
  $('textarea#tweet-text').on('input', function() {
    length = this.value.length;
    remaining = maxTweetChars - length;
    $counter.text(remaining);
    if (remaining < 0) {
      $counter.css('color', 'red');
    }
  });
});