$(document).ready( () => {
  $counter = $('#tweetCharCounter');
  $('textarea#tweet-text').on('input', function() {
    length = this.value.length;
    console.log(length);
  });
});