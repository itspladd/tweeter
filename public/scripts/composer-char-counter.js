$(document).ready( () => {
  $('textarea#tweet-text').on('input', function() {
    console.log(this.value);
  });
});